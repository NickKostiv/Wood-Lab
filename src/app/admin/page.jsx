"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("kitchens");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log("Session check:", { session, error });

      if (error) {
        console.error("Session error:", error);
        return;
      }

      if (!session) {
        console.log("No session, redirecting to login...");
        router.push("/admin/login");
        return;
      }

      setSession(session);
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (session) {
      loadImages();
    }
  }, [category]);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("category", category);

      if (error) {
        console.error("Error loading images:", error);
        return;
      }

      setImages(data || []);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  const uploadImage = async event => {
    try {
      // Перевірка авторизації
      if (!session) {
        throw new Error("Необхідно авторизуватися");
      }

      setUploading(true);
      const file = event.target.files[0];

      // Перевіряємо чи файл вибрано
      if (!file) {
        throw new Error("No file selected");
      }

      console.log("Starting image optimization...");
      const optimizedFile = await optimizeImage(file);
      console.log("Image optimized successfully");

      const fileExt = "webp";
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${category}/${fileName}`;

      console.log("Uploading to storage...");
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("gallery")
        .upload(filePath, optimizedFile);

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw uploadError;
      }

      console.log("Getting public URL...");
      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      console.log("Inserting into database...");
      const { error: dbError } = await supabase
        .from("images")
        .insert([{ url: urlData.publicUrl, category }]);

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw dbError;
      }

      console.log("Upload completed successfully");
      loadImages();
    } catch (error) {
      console.error("Error uploading image:", error.message || error);
      // Показати користувачу повідомлення про помилку
      alert(
        "Помилка при завантаженні зображення: " +
          (error.message || "Невідома помилка")
      );
    } finally {
      setUploading(false);
    }
  };

  // Функція оптимізації
  async function optimizeImage(file) {
    const maxWidth = 1920;
    const maxHeight = 1080;

    return new Promise(resolve => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            URL.revokeObjectURL(img.src);
            resolve(blob);
          },
          "image/webp",
          0.8
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        console.error("Error loading image");
        resolve(file);
      };
    });
  }

  const deleteImage = async (imageId, imageUrl) => {
    try {
      const filePath = imageUrl.split("/").pop();

      await supabase.storage
        .from("gallery")
        .remove([`${category}/${filePath}`]);

      const { error } = await supabase
        .from("images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      loadImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-8">
            Адміністрування галереї
          </h1>

          <div className="mb-8">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border rounded-lg">
              <option value="kitchens">Кухні</option>
              <option value="bathrooms">Ванни</option>
              <option value="bedrooms">Спальні</option>
              <option value="living-rooms">Вітальні</option>
            </select>

            <label className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
              {uploading ? "Завантаження..." : "Додати фото"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={uploadImage}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map(image => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt=""
                  width={400}
                  height={300}
                  className="object-cover w-full h-[300px]"
                />
                <button
                  onClick={() => deleteImage(image.id, image.url)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Видалити
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
