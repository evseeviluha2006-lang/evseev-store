"use client";
import { createContext, useContext, useState, useEffect } from "react";

type LikedItem = {
  id: string;
  type: "product" | "art" | "post";
  title: string;
  image: string;
  price?: string;
  description: string;
};

const LikeContext = createContext<{
  likedItems: LikedItem[];
  toggleLike: (item: LikedItem) => void;
  isLiked: (id: string) => boolean;
}>({ 
  likedItems: [], 
  toggleLike: () => {}, 
  isLiked: () => false 
});

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("evseev-likes");
      if (saved) setLikedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("evseev-likes", JSON.stringify(likedItems));
    }
  }, [likedItems]);

  const toggleLike = (item: LikedItem) => {
    setLikedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      return [...prev, item];
    });
  };

  const isLiked = (id: string) => likedItems.some((i) => i.id === id);

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
}

export const useLikes = () => useContext(LikeContext);