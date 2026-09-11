import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/_components/CartContext";
import { LikeProvider } from "@/_components/LikeContext";
import PreorderWidget from "@/_components/PreorderWidget"; // <-- ДОБАВИЛИ ИМПОРТ ВИДЖЕТА

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
  title: "EVSEEV | Streetwear Brand",
  description: "Official store of EVSEEV brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${spaceGrotesk.variable} ${evseevGlav.variable} font-sans antialiased bg-black text-white`}>
        <CartProvider>
          <LikeProvider>
            {children}
            {/* ВИДЖЕТ ПРЕДЗАКАЗА (ДОБАВЛЕН СЮДА) */}
            <PreorderWidget />
          </LikeProvider>
        </CartProvider>
      </body>
    </html>
  );
}