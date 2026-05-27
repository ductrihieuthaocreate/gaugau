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
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight leading-tight">
            {title}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-[13px] font-semibold text-[#7B189F] hover:underline transition-colors"
            >
              View All
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
