"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const fileInputRef = useRef(null);

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
    const loadImages = async () => {
      try {
        console.log("Loading images for category:", category);
        const { data, error } = await supabase
          .from("images")
          .select("*")
          .eq("category", category);

        if (error) {
          console.error("Error loading images:", error);
          return;
        }

        console.log("Loaded images:", data);
        setImages(data || []);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    if (session) {
      loadImages();
    }
  }, [category, session]);

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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = event => {
    uploadImage(event);
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="relative z-10 bg-white rounded-lg shadow p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6">Адмін панель</h1>

            <div className="space-y-4">
              <div>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg">
                  <option value="kitchens">Кухні</option>
                  <option value="bathrooms">Ванни</option>
                  <option value="bedrooms">Спальні</option>
                  <option value="living-rooms">Вітальні</option>
                </select>
              </div>

              <div className="relative z-0">
                <button
                  onClick={handleUploadClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Додати фото
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
