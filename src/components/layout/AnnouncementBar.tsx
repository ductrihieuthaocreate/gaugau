"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";

export function AnnouncementBar() {
  const messages = useAdminStore((s) => s.settings.announcementMessages);
  const speed = useAdminStore((s) => s.settings.announcementSpeed);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, speed);
    return () => clearInterval(timer);
  }, [messages.length, speed]);

  return (
    <div
      className="bg-black text-white text-center py-2 px-4 overflow-hidden"
      style={{
        fontSize: "var(--announce-size)",
        fontWeight: "var(--announce-weight)",
        letterSpacing: "var(--announce-letter-spacing)",
      }}
    >
      <div className="transition-opacity duration-500">{messages[current] ?? ""}</div>
    </div>
  );
}
