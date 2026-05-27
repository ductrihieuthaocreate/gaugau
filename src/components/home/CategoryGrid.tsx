import Link from "next/link";
import Image from "next/image";

interface CategoryTile {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
}

interface Props {
  title?: string;
  categories: CategoryTile[];
}

export function CategoryGrid({ title, categories }: Props) {
  return (
    <section className="py-10 md:py-14">
      {title && (
        <div className="container-site mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        </div>
      )}
      <div className="container-site">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center gap-2"
            >
              {/* Square image tile — Wayfair-style subtle hover ring */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100 transition-opacity duration-200 group-hover:opacity-90" style={{ borderRadius: "4px" }}>
                <Image
                  src={cat.imageSrc}
                  alt={cat.imageAlt || cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
              </div>
              {/* Label below image — Wayfair-style */}
              <span className="text-[13px] font-semibold text-gray-800 group-hover:text-[var(--brand)] transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
