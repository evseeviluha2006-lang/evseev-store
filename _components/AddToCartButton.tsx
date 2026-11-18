"use client";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

type AddToCartButtonProps = {
  productId: string;
  size?: string;
  customText?: string;
};

export default function AddToCartButton({
  productId,
  size = "",
  customText,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    const product = getProduct(productId);

    if (!product) {
      console.error(`❌ Товар ${productId} не найден в каталоге`);
      return;
    }

    const resolvedSize = size || product.sizes[0] || "";

    addToCart(product.id, resolvedSize, 1);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdded}
      className={`w-full py-5 text-sm font-black uppercase tracking-[4px] transition-all duration-300 border ${
        isAdded
          ? "bg-green-600 border-green-600 text-white cursor-default"
          : "bg-white border-white text-black hover:bg-zinc-200"
      }`}
    >
      {isAdded ? "ДОБАВЛЕНО ✓" : (customText || "ДОБАВИТЬ В КОРЗИНУ →")}
    </button>
  );
}
