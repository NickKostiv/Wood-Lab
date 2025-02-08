"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Галерея", href: "/gallery" },
    { title: "Зв'яжіться з нами", href: "/contact" },
    { title: "Акції", href: "/promotions" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="Логотип"
              width={70}
              height={70}
              className="object-contain rounded-full"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors">
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-t">
            <div className="flex flex-col space-y-4 px-4 py-6">
              {menuItems.map(item => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
