"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateHero(hero: Record<string, unknown>): Promise<void> {
  const supabase = createAdminClient();
  await supabase
    .from("site_settings")
    .upsert({ key: "hero", value: hero, updated_at: new Date().toISOString() });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function updateAnnouncement(
  messages: string[],
  speed: number
): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from("site_settings").upsert({
    key: "announcement",
    value: { messages, speed },
    updated_at: new Date().toISOString(),
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function updateSiteSettings(
  site: Record<string, unknown>
): Promise<void> {
  const supabase = createAdminClient();
  await supabase
    .from("site_settings")
    .upsert({ key: "site", value: site, updated_at: new Date().toISOString() });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
