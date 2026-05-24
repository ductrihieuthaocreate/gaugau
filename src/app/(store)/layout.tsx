import { getAnnouncementSettings } from "@/lib/settings";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await getAnnouncementSettings();

  return (
    <>
      <AnnouncementBar
        messages={announcement.messages}
        speed={announcement.speed}
      />
      <Header />
      <main id="MainContent" className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
