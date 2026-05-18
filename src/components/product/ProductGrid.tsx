import { ProductCard } from "./ProductCard";
import Link from "next/link";
import type { Product } from "@/types";

interface Props {
  products: Product[];
  title?: string;
  viewAllHref?: string;
  columns?: 2 | 3 | 4;
}

const colClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function ProductGrid({ products, title, viewAllHref, columns = 4 }: Props) {
  if (!products.length) return null;

  return (
    <section className="py-12 md:py-16">
      {title && (
        <div className="container-site mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-[28px] font-bold tracking-tight leading-tight">
              {title}
            </h2>
            <div className="mt-2 w-10 h-[3px] bg-black rounded-full" />
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
            >
              View All
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          )}
        </div>
      )}
      <div className="container-site">
        <div className={`grid ${colClasses[columns]} gap-x-4 gap-y-10 md:gap-x-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
