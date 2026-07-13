"use client";
import { useLikes } from "./LikeContext";

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
  const { toggleLike, isLiked } = useLikes();
  const liked = isLiked(id);

  const handleClick = () => {
    toggleLike({ id, type, title, image, price, description });
  };

  const sizeClasses = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <button 
      onClick={handleClick}
      className={`${sizeClasses} flex items-center justify-center border border-white/20 rounded-full transition-all duration-300 ${
        liked ? "bg-red-500 border-red-500 text-white scale-110" : "bg-transparent text-zinc-400 hover:border-white hover:text-white"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}