"use client";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers", value: "best-sellers" },
];

export function SortSelect({ current }: { current: string }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sort", e.target.value);
    window.location.href = url.toString();
  };

  return (
    <select
      defaultValue={current}
      onChange={handleChange}
      className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-black"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
