"use client";
// Избранное хранится в localStorage и читается через useSyncExternalStore.
// Так все кнопки-сердечки и страница /likes видят одно и то же состояние.

import { useSyncExternalStore } from "react";

export type LikedItem = {
  id: string;
  type: "product" | "art" | "post";
  title: string;
  image: string;
  price?: string;
  description: string;
};

export const LIKES_KEY = "evseev-likes";
export const LIKES_EVENT = "likes-updated";

const EMPTY: LikedItem[] = [];

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Старые записи могли сохранять name/img/src — поддерживаем и их */
function normalizeLikes(value: unknown): LikedItem[] {
  if (!Array.isArray(value)) return EMPTY;

  const items: LikedItem[] = [];

  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;

    const item = raw as Record<string, unknown>;
    const id = asString(item.id);
    if (!id) continue;

    const type =
      item.type === "art" || item.type === "post" ? item.type : "product";

    const price = asString(item.price);

    items.push({
      id,
      type,
      title: asString(item.title) || asString(item.name),
      image: asString(item.image) || asString(item.img) || asString(item.src),
      ...(price ? { price } : {}),
      description: asString(item.description),
    });
  }

  return items;
}

export function readLikes(): LikedItem[] {
  if (typeof window === "undefined") return EMPTY;

  try {
    const raw = window.localStorage.getItem(LIKES_KEY);
    return raw ? normalizeLikes(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function writeLikes(items: LikedItem[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LIKES_KEY, JSON.stringify(items));
  } catch {
    // приватный режим / лимит хранилища — не роняем интерфейс
  }

  window.dispatchEvent(new Event(LIKES_EVENT));
}

export function toggleLikedItem(item: LikedItem): void {
  const current = readLikes();
  const exists = current.some((liked) => liked.id === item.id);

  writeLikes(
    exists ? current.filter((liked) => liked.id !== item.id) : [...current, item]
  );
}

export function removeLikedItem(id: string): void {
  writeLikes(readLikes().filter((item) => item.id !== id));
}

// --- React-стор -----------------------------------------------------------

let cachedRaw: string | null | undefined = undefined;
let cachedItems: LikedItem[] = EMPTY;

function getLikesSnapshot(): LikedItem[] {
  if (typeof window === "undefined") return EMPTY;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(LIKES_KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedItems;

  cachedRaw = raw;

  try {
    cachedItems = raw ? normalizeLikes(JSON.parse(raw)) : EMPTY;
  } catch {
    cachedItems = EMPTY;
  }

  return cachedItems;
}

function getServerLikesSnapshot(): LikedItem[] {
  return EMPTY;
}

function subscribeLikes(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(LIKES_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(LIKES_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useLikedItems(): LikedItem[] {
  return useSyncExternalStore(
    subscribeLikes,
    getLikesSnapshot,
    getServerLikesSnapshot
  );
}
