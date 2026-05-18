import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      <div className="container-site py-16">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="bg-white rounded-card p-6">
            <h2 className="font-bold text-lg mb-3">Orders</h2>
            <p className="text-sm text-gray-500 mb-4">View and track your orders.</p>
            <Link
              href="/account/orders"
              className="text-sm font-bold underline hover:opacity-60 transition-opacity"
            >
              View Orders
            </Link>
          </div>

          {/* Profile */}
          <div className="bg-white rounded-card p-6">
            <h2 className="font-bold text-lg mb-3">Profile</h2>
            <p className="text-sm text-gray-500 mb-4">Manage your personal information.</p>
            <Link
              href="/account/profile"
              className="text-sm font-bold underline hover:opacity-60 transition-opacity"
            >
              Edit Profile
            </Link>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-card p-6">
            <h2 className="font-bold text-lg mb-3">Addresses</h2>
            <p className="text-sm text-gray-500 mb-4">Manage your shipping addresses.</p>
            <Link
              href="/account/addresses"
              className="text-sm font-bold underline hover:opacity-60 transition-opacity"
            >
              Manage Addresses
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/account/login"
            className="text-sm text-gray-500 hover:underline"
          >
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
