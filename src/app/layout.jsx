import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic-ext"] });

export const metadata = {
  title: "Wood Lab | Виробництво меблів в Івано-Франківську",
  description:
    "Wood Lab - виготовлення дерев'яних меблів на замовлення в Івано-Франківську. ✓ Власне виробництво ✓ Гарантія якості ✓ Доставка по місту",
  keywords:
    "Wood Lab меблі, меблі Івано-Франківськ, Wood Lab Івано-Франківськ, виробництво меблів Івано-Франківськ",
  openGraph: {
    title: "Wood Lab | Дерев'яні меблі в Івано-Франківську",
    description:
      "Виготовлення дерев'яних меблів на замовлення в Івано-Франківську. Кухні, шафи, спальні з натурального дерева.",
    images: [
      {
        url: "https://wood-lab.vercel.app/9.jpg",
        width: 1200,
        height: 630,
        alt: "Wood Lab меблі з дерева",
      },
    ],
    locale: "uk_UA",
    type: "website",
    url: "https://wood-lab.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KxCaXWMW56W9R9hXjNdSkOeN1cXcO1Ia2AuoFXC_fMA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR-ID`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR-ID');
            `,
          }}
        />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
