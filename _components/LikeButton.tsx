"use client";

import { toggleLikedItem, useLikedItems } from "@/lib/likes";

type Props = {
  id: string;
  type: "product" | "art" | "post";
  title: string;
  image: string;
  price?: string;
  description: string;
  size?: "sm" | "md";
};

export default function LikeButton({ id, type, title, image, price, description, size = "md" }: Props) {
  const likedItems = useLikedItems();
  const liked = likedItems.some((item) => item.id === id);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleLikedItem({ id, type, title, image, price, description });
  };

  const sizeClasses = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? `Убрать ${title} из избранного` : `Добавить ${title} в избранное`}
      className={`${sizeClasses} flex items-center justify-center border backdrop-blur-sm transition-all duration-300 ${
        liked
          ? "border-ink bg-ink text-paper"
          : "border-ink/10 bg-paper/85 text-ink hover:border-ink hover:bg-paper"
      }`}
    >
      <svg
        width={size === "sm" ? 13 : 15}
        height={size === "sm" ? 13 : 15}
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
