import { createClient } from "@/lib/supabase/server";

export interface HeroSettings {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  overlayOpacity: number;
}

export interface AnnouncementSettings {
  messages: string[];
  speed: number;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  freeShippingThreshold: number;
}

const DEFAULT_HERO: HeroSettings = {
  title: "New Arrivals",
  subtitle:
    "Explore our latest collection of playful, functional, and beautifully designed products.",
  ctaLabel: "Shop New Arrivals",
  ctaHref: "/collections/new",
  imageSrc:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
  overlayOpacity: 0.32,
};

const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  messages: [
    "Free Shipping on Orders Over $35",
    "New Arrivals — Shop the Latest Collection :)",
    "Designed with Love, Made to Last",
  ],
  speed: 3000,
};

const DEFAULT_SITE: SiteSettings = {
  siteName: "Gaugau",
  siteTagline: "Playful, functional, beautifully designed.",
  freeShippingThreshold: 3500,
};

async function getSettingRow<T>(key: string, fallback: T): Promise<T> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return fallback;
    }
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();
    if (error || !data) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

export async function getHeroSettings(): Promise<HeroSettings> {
  return getSettingRow<HeroSettings>("hero", DEFAULT_HERO);
}

export async function getAnnouncementSettings(): Promise<AnnouncementSettings> {
  return getSettingRow<AnnouncementSettings>(
    "announcement",
    DEFAULT_ANNOUNCEMENT
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getSettingRow<SiteSettings>("site", DEFAULT_SITE);
}
