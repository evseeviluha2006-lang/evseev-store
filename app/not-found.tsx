import Link from "next/link";
import Header from "@/_components/Header";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[6px] mb-4">
            Error 404
          </p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Страница<br />не найдена
          </h1>
          <p className="text-zinc-500 text-sm mb-10">
            Возможно, товар продан или ссылка устарела.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalog"
              className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              В каталог
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
