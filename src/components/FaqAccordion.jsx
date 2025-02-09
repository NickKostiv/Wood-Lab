"use client";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 text-left flex justify-between items-center hover:text-gray-600 transition-colors"
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
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default function FaqAccordion() {
  const faqs = [
    {
      question: "Скільки часу займає виготовлення меблів?",
      answer:
        "Термін виготовлення залежить від складності проекту та завантаженості виробництва. В середньому, кухня виготовляється 3-4 тижні, шафа-купе - 2-3 тижні. Точний термін ми повідомимо після узгодження всіх деталей проекту.",
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
      question: "Чи можна замовити тільки дизайн-проект?",
      answer:
        "Так, ми надаємо послугу створення дизайн-проекту окремо. Ви отримаєте детальні креслення та 3D-візуалізацію вашого майбутнього інтер'єру з усіма необхідними специфікаціями.",
    },
    {
      question: "Які матеріали ви використовуєте?",
      answer:
        "Ми працюємо з якісними матеріалами від перевірених постачальників: ДСП Egger та Kronospan, фурнітура Blum та Hafele, стільниці з штучного каменю, натурального граніту та кварциту. Всі матеріали сертифіковані та екологічно безпечні.",
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
