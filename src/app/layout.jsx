import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic-ext"] });

export const metadata = {
  title: "Wood Lab",
  description: "Виготовлення меблів на замовлення в Івано-Франківську",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
