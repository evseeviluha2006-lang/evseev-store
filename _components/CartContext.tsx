"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type CartItem = Product & { quantity: number };

const CartContext = createContext<{
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  totalItems: number;
}>({ 
  items: [], 
  addToCart: () => {}, 
  removeFromCart: () => {}, 
  updateQuantity: () => {},
  totalItems: 0 
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("evseev-cart");
      if (saved) setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("evseev-cart", JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);