import { ProductCard } from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase().trim();

  const results = query
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="min-h-screen">
      <div className="bg-[#f1f1f1] py-10">
        <div className="container-site">
          <h1 className="text-3xl font-bold">
            {query ? `Search results for "${q}"` : "Search"}
          </h1>
          {query && (
            <p className="text-gray-500 text-sm mt-2">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="container-site py-8">
        {!query && (
          <p className="text-gray-500 text-center py-20">
            Enter a search term to find products.
          </p>
        )}
        {query && results.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium mb-2">No results found</p>
            <p className="text-sm">Try a different search term.</p>
          </div>
        )}
        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function generateMetadata({ searchParams }: Props) {
  return { title: "Search — Gaugau" };
}
