"use client";

import { useState } from "react";

const sizes = [
  { size: "S", waist: "40", length: "104", leg: "34" },
  { size: "M", waist: "42", length: "105", leg: "35" },
  { size: "L", waist: "44", length: "106", leg: "36" },
  { size: "XL", waist: "46", length: "107", leg: "37" },
];

export default function SizeGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3 w-full border-t border-line">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-[10px] font-medium uppercase tracking-[0.18em]"
      >
        <span>Таблица размеров</span>
        <span
          className={`text-[12px] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="overflow-x-auto pb-4">
          <table className="w-full border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-y border-line text-[9px] uppercase tracking-[0.16em] text-muted">
                <th className="py-2.5 pr-3 font-medium">Размер</th>
                <th className="py-2.5 pr-3 font-medium">Пот (см)</th>
                <th className="py-2.5 pr-3 font-medium">Длина (см)</th>
                <th className="py-2.5 pr-3 font-medium">Низ (см)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row.size} className="border-b border-line/70">
                  <td className="py-2.5 pr-3 font-medium">{row.size}</td>
                  <td className="py-2.5 pr-3 tabular-nums text-muted">{row.waist}</td>
                  <td className="py-2.5 pr-3 tabular-nums text-muted">{row.length}</td>
                  <td className="py-2.5 pr-3 tabular-nums text-muted">{row.leg}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="pt-3 text-[9px] leading-relaxed uppercase tracking-[0.12em] text-muted">
            ПОТ — полуобхват талии. Измерения указаны в сантиметрах.
            Допускается погрешность ±1 см.
          </p>
        </div>
      )}
    </div>
  );
}
