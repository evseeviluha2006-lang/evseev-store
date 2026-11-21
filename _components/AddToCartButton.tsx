"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

type AddToCartButtonProps = {
  productId: string;
  size?: string;
  customText?: string;
  className?: string;
};

export default function AddToCartButton({
  productId,
  size = "",
  customText,
  className = "",
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    const product = getProduct(productId);

    if (!product) {
      console.error(`Товар ${productId} не найден в каталоге`);
      return;
    }

    const resolvedSize = size || product.sizes[0] || "";

    addToCart(product.id, resolvedSize, 1);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdded}
      className={`flex w-full items-center justify-center gap-3 py-4 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:py-5 ${
        isAdded
          ? "cursor-default bg-paper text-ink"
          : "bg-ink text-paper hover:bg-paper hover:text-ink"
      } ${className}`}
    >
      {isAdded ? "Добавлено ✓" : customText || "Добавить в корзину"}
      {!isAdded && <span aria-hidden>→</span>}
    </button>
  );
}
