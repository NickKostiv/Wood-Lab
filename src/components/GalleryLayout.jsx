"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function GalleryLayout({ category, title }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    loadImages();
  }, [category]);

  const loadImages = async () => {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("category", category);

    if (error) {
      console.error("Error loading images:", error);
    } else {
      setImages(data || []);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">
            {title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative h-[300px] overflow-hidden rounded-lg"
                data-aos="zoom-in"
                data-aos-delay={index * 50}>
                <Image
                  src={image.url}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
