"use client";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTelegram, FaTiktok } from "react-icons/fa";

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
      items: ["+380 68 198 7851", "+380 66 204 6006"],
    },
    {
      icon: HiMail,
      title: "Email",
      items: ["wood.lab.ivanofrankivsk@gmail.com"],
    },
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/wood_lab_/",
      label: "Instagram",
    },
    { icon: FaTelegram, href: "https://t.me/+380662046006", label: "Telegram" },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@wood_lab?_t=ZM-8tm8DgkgL4g&_r=1",
      label: "TikTok",
    },
  ];

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-900 py-28">
        {/* Векторна графіка на фоні */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              className="text-gray-300">
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
              <h1 className="text-4xl font-bold mb-6 text-white">
                Зв'яжіться з нами
              </h1>
              <p className="text-xl text-gray-300 mb-8">
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
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-white">
                        {info.title}
                      </h3>
                      {info.items.map(item => (
                        <p key={item} className="text-gray-300">
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
                src="/2.jpg"
                alt="Контакти"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gray-800 p-6 rounded-xl shadow-xl">
                <h3 className="font-semibold mb-4 text-white">
                  Соціальні мережі
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-gray-300 hover:text-white transition-colors"
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
