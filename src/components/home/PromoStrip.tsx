import Link from "next/link";

interface Strip {
  label: string;
  href: string;
  bg: string;
  text: string;
}

const STRIPS: Strip[] = [
  { label: "New Arrivals", href: "/collections/new", bg: "#006fda", text: "#fff" },
  { label: "Best Sellers", href: "/collections/best-sellers", bg: "#000", text: "#fff" },
  { label: "Gifts Under $25", href: "/collections/gifts-under-25", bg: "#f1f1f1", text: "#000" },
  { label: "On Sale", href: "/collections/sale", bg: "#c72d00", text: "#fff" },
];

export function PromoStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {STRIPS.map((strip) => (
        <Link
          key={strip.label}
          href={strip.href}
          className="py-5 px-6 text-center font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
          style={{ backgroundColor: strip.bg, color: strip.text }}
        >
          {strip.label}
        </Link>
      ))}
    </div>
  );
}
