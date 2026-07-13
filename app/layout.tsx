import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import { LikeProvider } from "./components/LikeContext"; // <-- Импортируем контекст лайков

// Настройка шрифта (убрали cyrillic, чтобы не ломать сборку)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
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
      <body className={`${spaceGrotesk.variable} font-sans antialiased bg-black text-white`}>
        {/* Оборачиваем в оба провайдера */}
        <CartProvider>
          <LikeProvider>
            {children}
          </LikeProvider>
        </CartProvider>
      </body>
    </html>
  );
}