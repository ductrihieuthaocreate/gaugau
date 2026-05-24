"use client";

import { useState, useEffect } from "react";

interface Props {
  messages: string[];
  speed: number;
}

export function AnnouncementBar({ messages, speed }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % messages.length),
      speed
    );
    return () => clearInterval(t);
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
      <div className="transition-opacity duration-500">
        {messages[current] ?? ""}
      </div>
    </div>
  );
}
