import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt?: string;
  overlayOpacity?: number;
}

export function HeroBanner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt = "Hero banner",
  overlayOpacity = 0.3,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "520px" }}>

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay — more natural than flat opacity */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, rgba(0,0,0,${overlayOpacity + 0.15}) 0%, rgba(0,0,0,${overlayOpacity - 0.05}) 50%, rgba(0,0,0,0) 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative container-site flex items-center"
        style={{ minHeight: "520px" }}
      >
        <div className="max-w-lg py-24">
          <h1 className="text-white font-bold leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}
          >
            {title}
          </h1>

          <p className="text-white/85 mb-8 leading-relaxed"
            style={{ fontSize: "16px", maxWidth: "360px" }}
          >
            {subtitle}
          </p>

          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 hover:bg-gray-100 transition-colors"
            style={{ fontSize: "14px", borderRadius: "4px" }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
