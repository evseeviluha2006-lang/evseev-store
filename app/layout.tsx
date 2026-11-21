import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const evseevGlav = localFont({
  src: "./fonts/EVSEEVGLAV.ttf",
  variable: "--font-evseev-glav",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evseev.store"),
  title: {
    default: "EVSEEV — Streetwear из Калининграда",
    template: "%s — EVSEEV",
  },
  description:
    "Официальный магазин бренда EVSEEV. Архивные вещи, капсульные коллекции и обучение шитью. Калининград.",
  openGraph: {
    title: "EVSEEV — Streetwear из Калининграда",
    description:
      "Официальный магазин бренда EVSEEV. Архивные вещи, капсульные коллекции и обучение шитью.",
    url: "/",
    siteName: "EVSEEV",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "EVSEEV — streetwear из Калининграда",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EVSEEV — Streetwear из Калининграда",
    description:
      "Официальный магазин бренда EVSEEV. Архивные вещи, капсульные коллекции и обучение шитью.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f1ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${spaceGrotesk.variable} ${evseevGlav.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
