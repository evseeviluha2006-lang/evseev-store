"use client";
// true только после гидратации. Нужен, чтобы страницы с localStorage
// не мигали пустым состоянием при первой отрисовке.
// Реализовано через useSyncExternalStore — без setState в useEffect.

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
