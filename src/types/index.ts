export interface ProductImage {
  url: string;
  alt: string;
  position: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  price: number;
  compare_at_price?: number | null;
  stock_quantity: number;
  sku?: string | null;
  tags?: string[] | null;
  featured: boolean;
  category_id?: string | null;
  category?: Category | null;
  images?: ProductImage[] | null;
  created_at: string;
  stripe_price_id?: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name?: string | null;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  stripe_session_id?: string | null;
  created_at: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  overlayOpacity: number;
}
