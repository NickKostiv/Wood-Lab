"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import { FaFacebook, FaInstagram, FaTelegram, FaTiktok } from "react-icons/fa";
import {
  HiArrowRight,
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineStar,
} from "react-icons/hi";
import FaqAccordion from "@/components/FaqAccordion";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const mapCenter = {
    lat: 48.922633,
    lng: 24.711117,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Wood Lab - Меблі в Івано-Франківську",
    image: ["https://wood-lab.vercel.app/logo.jpg"],
    "@id": "https://wood-lab.vercel.app",
    url: "https://wood-lab.vercel.app",
    description:
      "Виготовлення дерев'яних меблів на замовлення в Івано-Франківську. Кухні, шафи, спальні з натурального дерева.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Івано-Франківськ",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.922633,
      longitude: 24.711117,
    },
    priceRange: "₴₴",
    keywords:
      "меблі Івано-Франківськ, дерев'яні меблі, меблі з дерева, кухні з дерева",
    areaServed: {
      "@type": "City",
      name: "Івано-Франківськ",
    },
    hasMap: "https://goo.gl/maps/ваші-координати",
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Navbar />

        {/* Hero Section */}
        <section className="min-h-screen relative flex items-center bg-gradient-to-br from-gray-900 to-gray-800 pt-28 md:pt-0">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none">
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse">
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                  Wood Lab - Корпусні меблі в Івано-Франківську
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Створюємо унікальні меблі, які перетворюють ваш простір у
                  місце, де хочеться жити
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                  Зв'яжіться з нами
                  <HiArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="relative" data-aos="fade-left">
                <div className="aspect-square relative">
                  <Image
                    src="/hero-img.jpg"
                    alt="Меблі"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-2">
                    <HiOutlineStar className="text-yellow-500 w-6 h-6" />
                    <span className="font-semibold">
                      4.9/5 рейтинг клієнтів
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-900">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="0">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
                  <HiOutlineHome className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Індивідуальний підхід
                </h3>
                <p className="text-gray-300">
                  Створюємо меблі, які ідеально відповідають вашому простору та
                  стилю
                </p>
              </div>
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="100">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
                  <HiOutlineCube className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Якісні матеріали
                </h3>
                <p className="text-gray-300">
                  Використовуємо тільки перевірені матеріали від надійних
                  постачальників
                </p>
              </div>
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="200">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
                  <HiOutlineStar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Гарантія якості
                </h3>
                <p className="text-gray-300">
                  Надаємо гарантію на всі наші вироби та післяпродажну підтримку
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Наші роботи */}
        <section className="py-20 bg-gray-800">
          <div className="container">
            <h2
              className="text-3xl font-bold text-center mb-12 text-white"
              data-aos="fade-up">
              Наші роботи
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[6, 7, 8, 9, 10, 11].map((num, index) => (
                <div
                  key={num}
                  className="relative h-64 group overflow-hidden rounded-lg"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}>
                  <Image
                    src={`/${num}.jpg`}
                    alt={`Робота ${num}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center px-8 py-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl"
                data-aos="fade-up">
                Дивитись більше
                <HiArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Про нас */}
        <section className="py-20 bg-gray-900">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <Image
                  src="/2.jpg"
                  alt="Про нас"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div data-aos="fade-left">
                <h2 className="text-3xl font-bold mb-6 text-white">Про нас</h2>
                <p className="text-gray-300 leading-relaxed">
                  Ми - команда професіоналів, яка створює меблі з любов'ю до
                  деталей. Наш досвід та сучасне обладнання дозволяють втілювати
                  найсміливіші ідеї наших клієнтів у реальність.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Як ми працюємо */}
        <section className="py-20 bg-gray-800">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Як ми працюємо
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Консультація",
                  description: "Обговорюємо ваші побажання та бюджет",
                  image: "/3.jpg",
                },
                {
                  title: "Проектування",
                  description: "Створюємо 3D-модель майбутніх меблів",
                  image: "/4.jpg",
                },
                {
                  title: "Виготовлення",
                  description: "Втілюємо проект у реальність",
                  image: "/5.jpg",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}>
                  <div className="relative h-60 mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-900">
          <div className="container">
            <h2
              className="text-3xl font-bold text-center mb-12 text-white"
              data-aos="fade-up">
              Найпоширеніші запитання
            </h2>
            <div className="max-w-3xl mx-auto" data-aos="fade-up">
              <FaqAccordion />
            </div>
          </div>
        </section>

        {/* Де нас знайти */}

        {/* Соціальні мережі */}
        <section className="py-20 bg-gray-800">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Ми в соціальних мережах
            </h2>
            <div className="flex justify-center space-x-8">
              {[
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/wood_lab_/",
                  label: "Instagram",
                },
                {
                  icon: FaTelegram,
                  href: "https://t.me/+380662046006",
                  label: "Telegram",
                },
                {
                  icon: FaTiktok,
                  href: "https://www.tiktok.com/@wood_lab?_t=ZM-8tm8DgkgL4g&_r=1",
                  label: "TikTok",
                },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-up">
                  <social.icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
