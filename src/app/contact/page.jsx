"use client";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";

export default function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const contactInfo = [
    {
      icon: HiPhone,
      title: "Телефони",
      items: ["+380 99 123 45 67", "+380 98 765 43 21"],
    },
    {
      icon: HiMail,
      title: "Email",
      items: ["info@woodlab.com", "support@woodlab.com"],
    },
    {
      icon: HiLocationMarker,
      title: "Адреса",
      items: ["вул. Незалежності 12", "м. Івано-Франківськ, 76018"],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTelegram, href: "#", label: "Telegram" },
  ];

  return (
    <main>
      <Navbar />
      <div className="min-h-screen pt-28">
        {/* Векторна графіка на фоні */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              className="text-gray-900">
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
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div data-aos="fade-right">
              <h1 className="text-4xl font-bold mb-6">Зв'яжіться з нами</h1>
              <p className="text-xl text-gray-600 mb-8">
                Ми завжди раді допомогти вам створити ідеальні меблі для вашого
                простору
              </p>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="flex items-start space-x-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.items.map(item => (
                        <p key={item} className="text-gray-600">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <Image
                src="/9.jpg"
                alt="Контакти"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <h3 className="font-semibold mb-4">Соціальні мережі</h3>
                <div className="flex space-x-4">
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer">
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
