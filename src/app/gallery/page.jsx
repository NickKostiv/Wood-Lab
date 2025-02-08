"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";

const categories = [
  {
    title: "Кухні",
    image: "/1.jpg",
    href: "/gallery/kitchens",
    description: "Сучасні та функціональні кухні на замовлення",
  },
  {
    title: "Ванни",
    image: "/2.jpg",
    href: "/gallery/bathrooms",
    description: "Стильні меблі для ванної кімнати",
  },
  {
    title: "Спальні",
    image: "/3.jpg",
    href: "/gallery/bedrooms",
    description: "Затишні спальні гарнітури",
  },
  {
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
      <div className="pt-24 pb-12">
        <div className="container">
          <h1
            className="text-4xl font-bold text-center mb-12"
            data-aos="fade-up">
            Галерея наших робіт
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link
                href={category.href}
                key={category.title}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <div className="relative h-[400px]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 p-6 flex flex-col justify-end">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {category.title}
                    </h2>
                    <p className="text-white/90">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
