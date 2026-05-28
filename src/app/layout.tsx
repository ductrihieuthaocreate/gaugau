import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go2go — Design Gifts & Lifestyle",
  description: "Shop thoughtfully designed gifts & lifestyle products at Go2go. Free shipping on orders over $35.",
  metadataBase: new URL("https://go2godesigns.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
