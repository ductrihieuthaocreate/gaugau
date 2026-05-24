"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from("orders").update({ status }).eq("id", id);

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
