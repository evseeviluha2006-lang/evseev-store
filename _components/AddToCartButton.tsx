"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

type AddToCartButtonProps = {
  productId: string;
  size?: string;
  quantity?: number;
  customText?: string;
  disabled?: boolean;
  className?: string;
};

export default function AddToCartButton({
  productId,
  size = "",
  quantity = 1,
  customText,
  disabled = false,
  className = "",
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (disabled) return;
    const product = getProduct(productId);

    if (!product) {
      console.error(`Товар ${productId} не найден в каталоге`);
      return;
    }

    const resolvedSize = size || product.sizes[0] || "";

    addToCart(product.id, resolvedSize, quantity);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isDisabled = isAdded || disabled;

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isDisabled}
      className={`flex w-full items-center justify-center gap-3 py-4 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:py-5 ${
        isAdded
          ? "cursor-default bg-paper text-ink"
          : disabled
            ? "cursor-not-allowed bg-ink/10 text-ink/40"
            : "bg-ink text-paper hover:bg-paper hover:text-ink"
      } ${className}`}
    >
      {isAdded ? "Добавлено ✓" : customText || "Добавить в корзину"}
      {!isAdded && !disabled && <span aria-hidden>→</span>}
    </button>
  );
}
