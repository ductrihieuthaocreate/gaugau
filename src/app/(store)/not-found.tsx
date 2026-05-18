import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-black text-white font-bold text-sm px-8 py-4 rounded-btn hover:bg-gray-900 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/collections/new"
            className="border border-black font-bold text-sm px-8 py-4 rounded-btn hover:bg-gray-100 transition-colors"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
