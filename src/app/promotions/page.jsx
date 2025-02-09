"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import { HiSparkles } from "react-icons/hi";

export default function Promotions() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-28 bg-gray-900">
        <div className="text-center" data-aos="fade-up">
          <HiSparkles className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-white">Coming Soon</h1>
          <p className="text-xl text-gray-300">
            Скоро тут з'являться спеціальні пропозиції та акції
          </p>
        </div>
      </div>
    </main>
  );
}
