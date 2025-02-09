"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("kitchens");
  const [images, setImages] = useState({});

  const menuItems = [
    { title: "Галерея", href: "/gallery" },
    { title: "Зв'яжіться з нами", href: "/contact" },
    { title: "Акції", href: "/promotions" },
  ];

  // Завантаження зображень з бази даних
  useEffect(() => {
    const loadImages = async () => {
      try {
        const { data, error } = await supabase
          .from("images")
          .select("*")
          .eq("category", selectedCategory);

        if (error) {
          console.error("Error loading images:", error);
          return;
        }

        // Групуємо зображення за категоріями
        setImages(prevImages => ({
          ...prevImages,
          [selectedCategory]: data || [],
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadImages();
  }, [selectedCategory]); // Завантажуємо при зміні категорії

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  return (
    <nav className="fixed w-full bg-gray-900 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL || ""}/logo.jpg`}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-white">Wood Lab</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors">
                {item.title}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 focus:outline-none text-white">
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute left-0 right-0 bg-gray-900 px-4 pt-2 pb-4 shadow-lg transition-all duration-300 ${
            isOpen ? "top-20 opacity-100" : "-top-96 opacity-0"
          }`}>
          <div className="flex flex-col space-y-4">
            {menuItems.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 bg-gray-900 shadow-lg transition-all duration-300 ${
          isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          top: "100%",
          zIndex: 40,
        }}>
        <div className="grid grid-cols-3 gap-4 p-6">
          {images[selectedCategory]?.map((image, index) => (
            <div key={image.id} className="aspect-square relative">
              <Image
                src={image.url}
                alt={`${selectedCategory} ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
