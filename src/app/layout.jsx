import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic-ext"] });

export const metadata = {
  title: "Меблі в Івано-Франківську",
  description: "Виготовлення меблів на замовлення в Івано-Франківську",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
