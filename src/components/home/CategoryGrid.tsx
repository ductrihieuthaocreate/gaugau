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
    <section className="py-12 md:py-16 bg-[#f8f8f8]">
      {title && (
        <div className="container-site mb-8">
          <div>
            <h2 className="text-2xl md:text-[28px] font-bold tracking-tight leading-tight">
              {title}
            </h2>
            <div className="mt-2 w-10 h-[3px] bg-black rounded-full" />
          </div>
        </div>
      )}
      <div className="container-site">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-[#e8e8e8]"
            >
              <Image
                src={cat.imageSrc}
                alt={cat.imageAlt || cat.name}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
              />

              {/* Gradient overlay — stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

              {/* Label */}
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-white font-bold text-sm uppercase tracking-[0.12em] leading-tight drop-shadow-sm">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
