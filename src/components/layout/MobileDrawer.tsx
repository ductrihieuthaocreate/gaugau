"use client";

import { X, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "./navData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: Props) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const activeNav = NAV_ITEMS.find((n) => n.label === activeSubmenu);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-[#dddddd] z-50 flex flex-col slide-in-left overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white">
          <span className="font-bold text-sm uppercase tracking-widest">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Main menu */}
        {!activeSubmenu ? (
          <nav className="flex-1 py-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <button
                    className="flex items-center justify-between w-full px-5 py-3 text-sm font-medium hover:bg-white/30 transition-colors"
                    onClick={() => setActiveSubmenu(item.label)}
                  >
                    {item.label}
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full px-5 py-3 text-sm font-medium hover:bg-white/30 transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        ) : (
          /* Submenu */
          <div className="flex-1 py-2">
            <button
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold hover:bg-white/30 transition-colors w-full"
              onClick={() => setActiveSubmenu(null)}
            >
              <ChevronLeft size={16} />
              {activeSubmenu}
            </button>
            <div className="border-t border-white/50 mt-1">
              {activeNav?.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className="flex items-center px-5 py-3 text-sm hover:bg-white/30 transition-colors"
                  onClick={onClose}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer links */}
        <div className="border-t border-white px-5 py-4 text-xs text-gray-600 space-y-2">
          <Link href="/account/login" className="block hover:underline" onClick={onClose}>
            Log in
          </Link>
          <Link href="/account/register" className="block hover:underline" onClick={onClose}>
            Create account
          </Link>
        </div>
      </div>
    </>
  );
}
