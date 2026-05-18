"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";
import type { Product, Category } from "@/types";

export interface HeroSettings {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  overlayOpacity: number;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  freeShippingThreshold: number; // cents
  announcementMessages: string[];
  announcementSpeed: number; // ms
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  total: number;
  createdAt: string;
  shippingAddress: string;
}

interface AdminState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  hero: HeroSettings;
  settings: SiteSettings;

  // Products
  addProduct: (p: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleActive: (id: string) => void;

  // Categories
  addCategory: (c: Omit<Category, "id" | "created_at">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Orders
  updateOrderStatus: (id: string, status: Order["status"]) => void;

  // Hero
  updateHero: (updates: Partial<HeroSettings>) => void;

  // Settings
  updateSettings: (updates: Partial<SiteSettings>) => void;
}

const SEED_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customerName: "Alice Nguyen",
    customerEmail: "alice@example.com",
    status: "delivered",
    items: [{ productId: "1", productTitle: "Robin 3D Puzzle", quantity: 2, unitPrice: 1800 }],
    total: 3600,
    createdAt: "2026-05-10T10:00:00Z",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customerName: "Bob Tran",
    customerEmail: "bob@example.com",
    status: "processing",
    items: [
      { productId: "4", productTitle: "Golf Wine Aerator", quantity: 1, unitPrice: 1600 },
      { productId: "8", productTitle: "Bear Hug Mug", quantity: 1, unitPrice: 1400 },
    ],
    total: 3000,
    createdAt: "2026-05-14T14:30:00Z",
    shippingAddress: "456 Oak Ave, Chicago, IL 60601",
  },
  {
    id: "ORD-003",
    customerName: "Clara Lee",
    customerEmail: "clara@example.com",
    status: "pending",
    items: [{ productId: "7", productTitle: "Magnetic Hourglass", quantity: 1, unitPrice: 3200 }],
    total: 3200,
    createdAt: "2026-05-17T09:15:00Z",
    shippingAddress: "789 Pine Rd, Austin, TX 73301",
  },
  {
    id: "ORD-004",
    customerName: "David Kim",
    customerEmail: "david@example.com",
    status: "shipped",
    items: [{ productId: "3", productTitle: "Axolotl Punch Needle Kit", quantity: 1, unitPrice: 2400 }],
    total: 2400,
    createdAt: "2026-05-15T11:20:00Z",
    shippingAddress: "321 Elm St, Seattle, WA 98101",
  },
  {
    id: "ORD-005",
    customerName: "Eva Pham",
    customerEmail: "eva@example.com",
    status: "cancelled",
    items: [{ productId: "2", productTitle: "Bike Bell — Juicy Jingles", quantity: 3, unitPrice: 1200 }],
    total: 3600,
    createdAt: "2026-05-12T16:45:00Z",
    shippingAddress: "654 Maple Dr, Miami, FL 33101",
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      products: MOCK_PRODUCTS,
      categories: MOCK_CATEGORIES,
      orders: SEED_ORDERS,

      hero: {
        title: "New Arrivals",
        subtitle: "Explore our latest collection of playful, functional, and beautifully designed products.",
        ctaLabel: "Shop New Arrivals",
        ctaHref: "/collections/new",
        imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
        overlayOpacity: 0.32,
      },

      settings: {
        siteName: "Gaugau",
        siteTagline: "Playful, functional, beautifully designed.",
        freeShippingThreshold: 3500,
        announcementMessages: [
          "Free Shipping on Orders Over $35",
          "New Arrivals — Shop the Latest Collection :)",
          "Designed with Love, Made to Last",
        ],
        announcementSpeed: 3000,
      },

      // ── Products ──
      addProduct: (p) =>
        set((s) => ({
          products: [
            ...s.products,
            { ...p, id: `prod-${Date.now()}`, created_at: new Date().toISOString() },
          ],
        })),

      updateProduct: (id, updates) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      toggleFeatured: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, is_featured: !p.is_featured } : p
          ),
        })),

      toggleActive: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, is_active: !p.is_active } : p
          ),
        })),

      // ── Categories ──
      addCategory: (c) =>
        set((s) => ({
          categories: [
            ...s.categories,
            { ...c, id: `cat-${Date.now()}`, created_at: new Date().toISOString() },
          ],
        })),

      updateCategory: (id, updates) =>
        set((s) => ({
          categories: s.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCategory: (id) =>
        set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),

      // ── Orders ──
      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      // ── Hero ──
      updateHero: (updates) =>
        set((s) => ({ hero: { ...s.hero, ...updates } })),

      // ── Settings ──
      updateSettings: (updates) =>
        set((s) => ({ settings: { ...s.settings, ...updates } })),
    }),
    {
      name: "gaugau-admin",
      partialize: (s) => ({
        products: s.products,
        categories: s.categories,
        orders: s.orders,
        hero: s.hero,
        settings: s.settings,
      }),
    }
  )
);
