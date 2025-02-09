"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import {
  HiCheck,
  HiCube,
  HiSparkles,
  HiCog,
  HiShieldCheck,
  HiColorSwatch,
} from "react-icons/hi";

export default function Materials() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const materials = [
    {
      title: "Фарбований МДФ",
      description:
        "Цей матеріал покривається кількома шарами фарби та лаку, після чого полірується до ідеальної гладкості. Фарбування дає можливість обрати будь-який відтінок, фактуру та індивідуальне фрезерування.",
      icon: HiColorSwatch,
    },
    {
      title: "Шпонований МДФ",
      description:
        "Поєднує в собі природну красу деревини та надійність МДФ. Шпон – це тонкий шар натурального дерева, який наклеюється на основу, тонується та покривається захисним лаком. Такий матеріал зберігає унікальну текстуру деревини та виглядає вишукано.",
      icon: HiCube,
    },
    {
      title: "Фасади з HPL",
      description:
        "Міцне покриття, що виготовляється методом пресування шарів паперу, просочених захисними смолами. Завдяки цьому фасади мають високу стійкість до температурних коливань, вологи та механічних пошкоджень.",
      icon: HiShieldCheck,
    },
    {
      title: "Акрилові фасади МДФ",
      description:
        "Сучасний матеріал, що створює ефект глянцевої поверхні з дзеркальним блиском. Акрилові покриття мають товщину до 2 мм, що дозволяє отримати ідеально гладкі та яскраві фасади без імітації деревної текстури.",
      icon: HiSparkles,
    },
    {
      title: "Ламінований МДФ",
      description:
        "Фасади з ламінованого МДФ вирізняються широким вибором текстур та кольорів, що імітують дерево, камінь та інші натуральні матеріали. Вони стійкі до вологи, прості у догляді та витримують механічні навантаження.",
      icon: HiColorSwatch,
    },
    {
      title: "AGT панелі",
      description:
        "AGT панелі – це сучасний різновид МДФ фасадів, вкритий високоякісною плівкою. Вони вирізняються елегантним дизайном, різноманіттям кольорів та текстур, а також високою стійкістю до впливу вологи та механічних пошкоджень. Завдяки технології виробництва такі панелі мають довгий термін служби та зберігають бездоганний вигляд навіть при активній експлуатації.",
      icon: HiShieldCheck,
    },
  ];

  const blumFeatures = [
    "Довговічність – механізми розраховані на тисячі циклів відкривання та закривання без втрати якості",
    "Плавний і безшумний рух – завдяки технології Blumotion дверцята та шухляди закриваються м'яко та без ударів",
    "Зручність у використанні – механізми Tip-On та Servo-Drive дозволяють відкривати фасади легким дотиком, навіть без ручок",
    "Навантаження та міцність – витримують значну вагу, що важливо для великих шухляд та містких шаф",
  ];

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1
            className="text-4xl font-bold text-center mb-12 text-white"
            data-aos="fade-up">
            Матеріали та комплектуючі
          </h1>

          <section className="mb-16">
            <h2
              className="text-2xl font-bold mb-8 text-white"
              data-aos="fade-up">
              Для фасадів кухонь та санвузлів використовуємо:
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {materials.map((material, index) => (
                <div
                  key={material.title}
                  className="bg-gray-800 p-6 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}>
                  <material.icon className="w-8 h-8 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {material.title}
                  </h3>
                  <p className="text-gray-300">{material.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-8 text-white">
              Матеріали для корпусів
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg">
              <p className="text-gray-300">
                Для фасадів та корпусу в інші приміщення використовуємо
                ламіноване ДСП таких компаній, як: Egger, Kronospan, Skin,
                Saviola. Усі деталі крайкуємо по периметру ПУР клеєм.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2
              className="text-2xl font-bold mb-8 text-white"
              data-aos="fade-up">
              Фурнітура Blum
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg" data-aos="fade-up">
              <HiCog className="w-12 h-12 text-gray-300 mb-6" />
              <p className="text-gray-300 mb-6">
                У більшості наших виробів встановлюється фурнітура Blum –
                австрійського виробника, що є світовим лідером у цій сфері.
              </p>
              <h3 className="text-xl font-bold mb-4 text-white">
                Чому ми обираємо Blum?
              </h3>
              <ul className="space-y-4">
                {blumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <HiCheck className="w-6 h-6 text-gray-300 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
