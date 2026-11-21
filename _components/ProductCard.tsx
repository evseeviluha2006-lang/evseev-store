"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/_components/LikeButton";
import { collectionLabel } from "@/lib/collections";
import { formatPrice, type Product } from "@/lib/products";

type Props = {
  product: Product;
  priority?: boolean;
  index?: number;
  className?: string;
};

export default function ProductCard({ product, priority = false, index, className = "" }: Props) {
  const secondImage = product.images[1];

  return (
    <Link
      href={`/catalog/${product.id}`}
      className={`group relative block ${className}`}
    >
      <div className="media relative aspect-[3/4] w-full">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        {secondImage && (
          <Image
            src={secondImage}
            alt={`${product.name} — вид 2`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {typeof index === "number" && !product.isPreorder && !product.limitedDrop && (
          <span className="absolute top-2.5 left-2.5 text-[9px] tabular-nums tracking-[0.18em] text-paper mix-blend-difference">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {product.isPreorder && (
          <span className="absolute top-2.5 left-2.5 bg-paper px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-ink">
            Pre-order
          </span>
        )}

        {product.limitedDrop && !product.isPreorder && (
          <span className="absolute top-2.5 left-2.5 bg-ink px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-paper">
            Limited drop
          </span>
        )}

        <div
          className="absolute top-2.5 right-2.5 z-20"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <LikeButton
            id={product.id}
            type="product"
            title={product.name}
            image={product.images[0]}
            price={formatPrice(product.price)}
            description={product.description}
            size="sm"
          />
        </div>

        <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-center bg-ink py-3 text-[9px] font-medium uppercase tracking-[0.22em] text-paper transition-transform duration-300 group-hover:translate-y-0 md:flex">
          Смотреть
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="text-[11px] leading-snug font-medium uppercase tracking-[0.04em] md:text-[12px]">
          {product.name}
        </h3>
        <span className="text-[11px] tabular-nums whitespace-nowrap md:text-[12px]">
          {formatPrice(product.price)}
        </span>
      </div>

      <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted">
        {collectionLabel(product.collection)}
      </p>
    </Link>
  );
}
