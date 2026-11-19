"use client";
// Единственное место, где корзина читается и пишется.
// В localStorage храним только { id, size, quantity } — цены и названия
// всегда берутся из lib/products, чтобы они не расходились.

import { useSyncExternalStore } from "react";
import { getProduct, MAX_QUANTITY, type CartLine } from "./products";

export const CART_KEY = "evseev-cart";
export const CART_EVENT = "cart-updated";

/** Приводит что угодно из localStorage к валидным строкам корзины */
export function normalizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  const lines: CartLine[] = [];

  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;

    const id = typeof item.id === "string" ? item.id : "";
    const product = getProduct(id);
    if (!product) continue;

    // Пишем в корзину актуальный id: у товара мог поменяться адрес (burgziper → burgenzipper)
    const realId = product.id;

    let size = typeof item.size === "string" ? item.size.trim() : "";
    if (product.sizes.length === 1) {
      // Товар есть только в одном размере — старый размер из localStorage не должен ломать заказ
      size = product.sizes[0];
    } else if (size && !product.sizes.includes(size)) {
      // Размера больше нет в наличии — просим выбрать заново
      size = "";
    }

    const rawQuantity = Number(item.quantity ?? item.qty ?? 1);
    const quantity = Number.isFinite(rawQuantity)
      ? Math.min(MAX_QUANTITY, Math.max(1, Math.round(rawQuantity)))
      : 1;

    const existing = lines.find(
      (line) => line.id === realId && line.size === size
    );
    if (existing) {
      existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + quantity);
    } else {
      lines.push({ id: realId, size, quantity });
    }
  }

  return lines;
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? normalizeCart(JSON.parse(raw)) : [];
  } catch {
    // Битый JSON не должен ронять сайт
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    // localStorage может быть недоступен (приватный режим / лимит)
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(
  id: string,
  size: string,
  quantity = 1
): CartLine[] {
  const lines = readCart();
  const existing = lines.find(
    (line) => line.id === id && line.size === size
  );

  if (existing) {
    existing.quantity = Math.min(
      MAX_QUANTITY,
      existing.quantity + Math.max(1, quantity)
    );
  } else {
    lines.push({
      id,
      size,
      quantity: Math.min(MAX_QUANTITY, Math.max(1, quantity)),
    });
  }

  writeCart(lines);
  return lines;
}

export function countCartItems(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

// --- React-стор -----------------------------------------------------------
// useSyncExternalStore читает localStorage как внешний источник состояния.
// Это избавляет от setState внутри useEffect и автоматически синхронизирует
// корзину между шапкой и страницами.

/** Одна и та же ссылка для пустой корзины — чтобы React не ререндерил зря */
const EMPTY: CartLine[] = [];

/** Кэш последнего прочитанного значения (snapshot должен быть стабильным) */
let cachedRaw: string | null | undefined = undefined;
let cachedLines: CartLine[] = EMPTY;

function getCartSnapshot(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CART_KEY);
  } catch {
    raw = null;
  }

  // localStorage не изменился — возвращаем тот же массив
  if (raw === cachedRaw) return cachedLines;

  cachedRaw = raw;

  try {
    cachedLines = raw ? normalizeCart(JSON.parse(raw)) : EMPTY;
  } catch {
    cachedLines = EMPTY;
  }

  return cachedLines;
}

function getServerCartSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribeCart(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  // Своё событие — запись из этого же таба, "storage" — из других вкладок
  window.addEventListener(CART_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(CART_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Текущие строки корзины с автообновлением при изменении */
export function useCartLines(): CartLine[] {
  return useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot
  );
}

