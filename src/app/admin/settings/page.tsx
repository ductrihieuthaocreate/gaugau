import { createAdminClient } from "@/lib/supabase/admin";
import { SettingsClient } from "@/components/admin/SettingsClient";

const DEFAULT_HERO = {
  title: "New Arrivals",
  subtitle:
    "Explore our latest collection of playful, functional, and beautifully designed products.",
  ctaLabel: "Shop New Arrivals",
  ctaHref: "/collections/new",
  imageSrc:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
  overlayOpacity: 0.32,
};

const DEFAULT_ANNOUNCEMENT = {
  messages: [
    "Free Shipping on Orders Over $35",
    "New Arrivals — Shop the Latest Collection :)",
    "Designed with Love, Made to Last",
  ],
  speed: 3000,
};

const DEFAULT_SITE = {
  siteName: "Gaugau",
  siteTagline: "Playful, functional, beautifully designed.",
  freeShippingThreshold: 3500,
};

export default async function AdminSettingsPage() {
  const supabase = createAdminClient();
  const { data: rows } = await supabase.from("site_settings").select("*");
  const map = Object.fromEntries((rows ?? []).map((r) => [r.key, r.value]));

  return (
    <SettingsClient
      initialHero={map.hero ?? DEFAULT_HERO}
      initialAnnouncement={map.announcement ?? DEFAULT_ANNOUNCEMENT}
      initialSite={map.site ?? DEFAULT_SITE}
    />
  );
}
