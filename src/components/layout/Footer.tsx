import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

const FOOTER_COLUMNS = [
  {
    title: "Need Help?",
    links: [
      { label: "Product Support",  href: "/pages/support" },
      { label: "Return Items",     href: "/pages/returns" },
      { label: "Contact Us",       href: "/pages/contact" },
      { label: "Return Policy",    href: "/pages/return-policy" },
    ],
  },
  {
    title: "Get To Know Us",
    links: [
      { label: "About Us",         href: "/pages/about" },
      { label: "Our Designers",    href: "/pages/designers" },
      { label: "News & Events",    href: "/pages/news" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "New Arrivals",     href: "/collections/new" },
      { label: "Best Sellers",     href: "/collections/best-sellers" },
      { label: "Gifts",            href: "/collections/gifts" },
      { label: "Sale",             href: "/collections/sale" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy",   href: "/pages/privacy" },
      { label: "Terms of Service", href: "/pages/terms" },
      { label: "Order Status",     href: "/account" },
    ],
  },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay"];

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="container-site py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="font-black text-2xl tracking-tight block mb-3"
              style={{ color: "var(--brand-light)" }}
            >
              go2go
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your go-to destination for design gifts and lifestyle products.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "https://instagram.com", icon: "IG" },
                { label: "Facebook",  href: "https://facebook.com",  icon: "FB" },
                { label: "Pinterest", href: "https://pinterest.com", icon: "PT" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center text-[10px] font-bold hover:border-white hover:text-white transition-colors text-gray-400"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-gray-300">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-md">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-1 text-gray-200">
              Stay in the loop
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              New products, gift ideas, and design inspiration — straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Go2go. All rights reserved. go2godesigns.com
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="bg-white text-black text-[10px] font-medium px-2 py-0.5 rounded"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
