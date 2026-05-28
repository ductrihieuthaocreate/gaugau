import Link from "next/link";
import type { HeroSettings } from "@/types";

interface Props {
  settings: HeroSettings;
}

export default function HeroBanner({ settings }: Props) {
  const { title, subtitle, ctaLabel, ctaHref, imageSrc, overlayOpacity } = settings;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#1a1a1a",
      }}
    >
      {/* Background image */}
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0,0,0,${overlayOpacity ?? 0.35})`,
        }}
      />

      {/* Content */}
      <div className="container-site" style={{ position: "relative", zIndex: 1, padding: "80px var(--container-pad)" }}>
        <div style={{ maxWidth: "560px" }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            {subtitle}
          </p>
          <Link
            href={ctaHref}
            style={{
              display: "inline-block",
              background: "#7B189F",
              color: "white",
              padding: "14px 32px",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
