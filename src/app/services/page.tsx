import ServiceProviderCard from "@/components/service/ServiceProviderCard";
import CategoryFilter from "@/components/service/CategoryFilter";
import { Provider } from "@/lib/type";
import { getApprovedServiceProviders, getUserSession } from "@/lib/api";
import Link from "next/link";

interface PageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ServiceProviderPage({ searchParams }: PageProps) {
  const category = searchParams.category || "All";
  const session = await getUserSession();

  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;

  const providers = await getApprovedServiceProviders(
    category,
    session.accessToken
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-12">
      <div className=" mx-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Service Providers
          </h1>
          <CategoryFilter selectedCategory={category} />
        </div>
        <p className="text-gray-500 mb-10 text-center sm:text-left pl-4">
          Find trusted professionals near you.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p, i) => (
            <ServiceProviderCard key={i} provider={p} />
          ))}
          {providers.length === 0 && (
            <p className="text-center col-span-full text-gray-500  mt-6">
              😔 No providers found in this category.
            </p>
          )}
        </div>
      </div>
      <Link
        href="/service-provider"
        className="fixed bottom-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-105 text-sm font-medium z-50"
      >
        Register as Provider
      </Link>
    </div>
  );
}
