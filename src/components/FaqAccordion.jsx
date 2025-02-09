"use client";
import { useState } from "react";
import { HiChevronDown, HiArrowRight } from "react-icons/hi";
import Link from "next/link";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Функція для обробки текстової відповіді
  const renderAnswer = answer => {
    if (typeof answer === "string") {
      return <p className="text-gray-200">{answer}</p>;
    }
    return answer; // Повертаємо як є, якщо це вже JSX (для питання про матеріали)
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-white py-6 text-left flex justify-between items-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-semibold">{question}</span>
        <HiChevronDown
          className={`w-6 h-6 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}>
        {renderAnswer(answer)}
      </div>
    </div>
  );
};

export default function FaqAccordion() {
  const faqs = [
    {
      question: "Скільки часу займає виготовлення меблів?",
      answer:
        "Термін виготовлення залежить від складності проекту та завантаженості виробництва. В середньому 45 робочих днів. Точний термін ми повідомимо після узгодження всіх деталей проекту.",
    },
    {
      question: "Чи надаєте ви гарантію на меблі?",
      answer:
        "Так, ми надаємо гарантію 2 роки на всі наші вироби. Гарантія поширюється на фурнітуру, механізми та якість збірки. Також ми забезпечуємо післягарантійне обслуговування.",
    },
    {
      question: "Як відбувається процес замовлення?",
      answer:
        "Процес починається з консультації та замірів приміщення. Потім ми створюємо 3D-проект та прораховуємо вартість. Після узгодження всіх деталей та внесення передоплати починається виробництво. Завершальний етап - доставка та монтаж.",
    },
    {
      question: "Які матеріали ви використовуєте?",
      answer: (
        <div>
          <p className="text-gray-200 mb-4">
            Ми використовуємо тільки перевірені матеріали, які забезпечують
            міцність, довгий термін служби та естетичний вигляд меблів.
          </p>
          <Link
            href="/materials"
            className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Дізнатися більше про матеріали
            <HiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
