export const dynamic = "force-dynamic";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminOrdersList } from "@/components/admin/AdminOrdersList";

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .order("created_at", { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <AdminOrdersList orders={(orders as any[]) ?? []} />;
}
