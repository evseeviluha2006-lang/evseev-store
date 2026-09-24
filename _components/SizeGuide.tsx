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
    <div className="w-full mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 border border-white/20 text-xs font-bold uppercase tracking-[3px] hover:bg-white/5 transition-colors flex items-center justify-between px-4"
        type="button"
      >
        <span>Размерная сетка</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="border border-t-0 border-white/20 overflow-x-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-zinc-900 border-b border-white/10">
                <th className="py-3 px-4 font-mono text-zinc-500 uppercase tracking-widest">Размер</th>
                <th className="py-3 px-4 font-mono text-zinc-500 uppercase tracking-widest">ПОТ (см)</th>
                <th className="py-3 px-4 font-mono text-zinc-500 uppercase tracking-widest">Длина (см)</th>
                <th className="py-3 px-4 font-mono text-zinc-500 uppercase tracking-widest">Низ (см)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row.size} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold font-mono">{row.size}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.waist}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.length}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.leg}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 bg-zinc-900/50 border-t border-white/5">
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider leading-relaxed">
              ПОТ — полуобхват талии. Измерения указаны в сантиметрах. Допускается погрешность ±1 см.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}