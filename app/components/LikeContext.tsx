"use client";
import { createContext, useContext, useState, useEffect } from "react";

type LikedItem = {
  id: string;
  type: "product" | "art" | "post"; // Тип контента
  title: string;
  image: string;
  price?: string; // Цена (только для товаров)
  description: string; // Описание истории создания
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

  // Загрузка из памяти браузера
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("evseev-likes");
      if (saved) setLikedItems(JSON.parse(saved));
    }
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("evseev-likes", JSON.stringify(likedItems));
    }
  }, [likedItems]);

  const toggleLike = (item: LikedItem) => {
    setLikedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id); // Удалить если уже есть
      return [...prev, item]; // Добавить если нет
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