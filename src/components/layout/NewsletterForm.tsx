"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <p className="text-sm text-green-400 font-medium">
        Thanks for subscribing! 🎉
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-transparent border border-gray-600 rounded-btn px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
      />
      <button
        type="submit"
        className="bg-white text-black font-bold text-sm px-5 py-2 rounded-btn hover:bg-gray-200 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
