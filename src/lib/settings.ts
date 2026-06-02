import { createClient } from "@/lib/supabase/server";
import type { HeroSettings } from "@/types";

const DEFAULT_HERO: HeroSettings = {
  title: "Design Gifts & Lifestyle",
  subtitle: "Thoughtfully designed objects for everyday life. Gifts they'll actually love.",
  ctaLabel: "Shop Now",
  ctaHref: "/collections/new",
  imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
  overlayOpacity: 0.35,
};

export async function getHeroSettings(): Promise<HeroSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "hero")
      .single();
    if (data?.value) return { ...DEFAULT_HERO, ...data.value };
  } catch {}
  return DEFAULT_HERO;
}
