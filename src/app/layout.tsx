import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Go2go — Your Go-To for Design Gifts",
  description: "Shop curated design gifts and lifestyle products for home, kitchen, play, and more. Free shipping on orders over $35.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
