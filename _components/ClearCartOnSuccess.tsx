"use client";

import { useEffect } from "react";
import { writeCart } from "@/lib/cart";

/**
 * Очищает корзину после успешной оплаты.
 * Раньше корзина чистилась до редиректа в ЮKassa — если покупатель
 * отменял оплату, товары терялись.
 */
export default function ClearCartOnSuccess() {
  useEffect(() => {
    writeCart([]);
  }, []);

  return null;
}
