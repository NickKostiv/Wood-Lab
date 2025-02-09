"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";

const categories = [
  {
    id: 1,
    title: "Кухні",
    image: "/1.jpg",
    href: "/gallery/kitchens",
    description: "Сучасні та функціональні кухні на замовлення",
  },
  {
    id: 2,
    title: "Ванни",
    image: "/2.jpg",
    href: "/gallery/bathrooms",
    description: "Стильні меблі для ванної кімнати",
  },
  {
    id: 3,
    title: "Спальні",
    image: "/3.jpg",
    href: "/gallery/bedrooms",
    description: "Затишні спальні гарнітури",
  },
  {
    id: 4,
    title: "Вітальні",
    image: "/4.jpg",
    href: "/gallery/living-rooms",
    description: "Елегантні меблі для вітальні",
  },
];

export default function Gallery() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">
            Галерея
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map(category => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative h-[300px] overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
