import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

const PAGES: Record<string, { title: string; content: string }> = {
  about: {
    title: "About Us",
    content:
      "We design products that are playful, functional, and beautiful. Every item in our catalog is thoughtfully crafted to bring a little more joy into everyday life.",
  },
  contact: {
    title: "Contact Us",
    content:
      "Have a question? We'd love to hear from you. Reach us at hello@gaugau.com or use the form below.",
  },
  "return-policy": {
    title: "Return Policy",
    content:
      "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Contact us to initiate a return.",
  },
  privacy: {
    title: "Privacy Policy",
    content:
      "We respect your privacy. We collect only the data necessary to process your orders and improve our services. We never sell your data.",
  },
  terms: {
    title: "Terms of Service",
    content:
      "By using our site you agree to our terms of service. Products are sold as described. Prices may change without notice.",
  },
  support: {
    title: "Product Support",
    content:
      "Need help with a product? Email us at support@gaugau.com with your order number and we'll get back to you within 1 business day.",
  },
  returns: {
    title: "Return Items",
    content:
      "To start a return, email returns@gaugau.com with your order number. We'll provide a prepaid label for eligible returns.",
  },
};

export default async function StaticPage({ params }: Props) {
  const { slug } = await params;
  const page = PAGES[slug];

  if (!page) notFound();

  return (
    <div className="min-h-screen">
      <div className="bg-[#f1f1f1] py-12">
        <div className="container-site">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{page.title}</h1>
        </div>
      </div>
      <div className="container-site py-12">
        <div className="max-w-2xl">
          <p className="text-gray-700 text-base leading-relaxed">{page.content}</p>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = PAGES[slug];
  return {
    title: page ? `${page.title} — Gaugau` : "Page — Gaugau",
  };
}

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}
