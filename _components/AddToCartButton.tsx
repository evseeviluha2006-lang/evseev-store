"use client";
import { useState } from "react";

const PRODUCTS_DB: Record<string, { name: string; price: string; image: string }> = {
  "hat-test-2": { name: "ШАПКА ТЕСТ-2 // GREY", price: "2 000 ₽", image: "/test-front.jpg" },
  "hoodie-spasibo": { name: "ХУДИ СПАСИБО // BLACK", price: "5 000 ₽", image: "/hodie-thanks.jpg" },
  "vlad-tee": { name: "VLAD DROBYSHEV // TEE", price: "4 500 ₽", image: "/vlad-tee-front.jpg" },
  "vlad-ls": { name: "VLAD DROBYSHEV // LONGSLEEVE", price: "5 900 ₽", image: "/vlad-ls-front.jpg" },
  "vlad-cape": { name: "VLAD DROBYSHEV // CAPE", price: "7 500 ₽", image: "/vlad-cape-front.jpg" },
  "fuck-its-evs-top": { name: "FUCK IT'S EVS // TOP", price: "3 500 ₽", image: "/product1.jpg" },
  "18-plus-w-evs-top": { name: "18+ W EVS // TOP", price: "3 500 ₽", image: "/product2.jpg" },
  "18-plus-evs-top": { name: "18+ EVS // TOP", price: "3 500 ₽", image: "/product3.jpg" },
  "distressed-pants": { name: "DISTRESSED PANTS", price: "7 990 ₽", image: "/dipa-front.jpg" },
  "radioevs-shirt": { name: "RADIOEVS SHIRT // INSPIRED BY RADIOHEAD", price: "5 990 ₽", image: "/radioevs-shirt-front.jpg" },
  "redholes-pants": { name: "RED HOLES PANTS // DISTRESSED", price: "8 490 ₽", image: "/redholes-front.jpg" },
  "krest-jacket": { name: "KREST JACKET // CRUSADER", price: "18 990 ₽", image: "/krest-jacket-front.jpg" },
  "psyho-jacket": { name: "PSYHO JACKET // SLIM FIT", price: "14 990 ₽", image: "/psyho-jacket-front.jpg" },
};

type AddToCartButtonProps = {
  product?: any;
  productId?: string;
};

export default function AddToCartButton({ product, productId }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    const id = productId || product?.id;
    if (!id) {
      console.error("❌ Не удалось определить ID товара");
      return;
    }

    const dbProduct = PRODUCTS_DB[id];
    const finalData = dbProduct || product;

    if (!finalData) {
      console.error(`❌ Товар ${id} не найден ни в базе, ни в пропсах`);
      return;
    }

    const cartItem = {
      id: id,
      name: finalData.name || "Без названия",
      price: finalData.price || "0 ₽",
      image: finalData.image || (Array.isArray((finalData as any).images) ? (finalData as any).images[0] : null),
      quantity: 1
    };

    if (!cartItem.image) {
      console.warn(`️ У товара ${id} нет картинки! Проверь PRODUCTS_DB`);
    }

    // ИСПРАВЛЕНО: используем evseev-cart вместо evseev_cart
    const stored = localStorage.getItem("evseev-cart");
    let cart: any[] = [];
    if (stored) {
      try { cart = JSON.parse(stored); } catch (e) { cart = []; }
    }

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
      if (!cart[existingIndex].image && cartItem.image) {
        cart[existingIndex].image = cartItem.image;
      }
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("evseev-cart", JSON.stringify(cart));
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdded}
      className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
        isAdded 
          ? "bg-green-600 border-green-600 text-white cursor-default" 
          : "bg-white border-white text-black hover:bg-zinc-200"
      }`}
    >
      {isAdded ? "ДОБАВЛЕНО ✓" : "ДОБАВИТЬ В КОРЗИНУ →"}
    </button>
  );
}