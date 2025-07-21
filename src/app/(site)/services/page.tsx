import ServiceProviderCard from "@/components/service/ServiceProviderCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Provider } from "@/lib/type";
import { getApprovedServiceProviders } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ServiceProviderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category || "All";
  const categories = [
    "All",
    "Electrician",
    "Plumber",
    "Carpenter",
    "House Cleaner",
    "AC/Fridge Repair",
    "Beautician",
    "Taxi Driver",
    "Pest Control",
  ];

  const providers = await getApprovedServiceProviders(category);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className=" mx-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Service Providers
          </h1>
          <CategoryFilter selectedCategory={category} categories={categories} />
        </div>
        <p className="text-gray-500 mb-10 text-center sm:text-left pl-4">
          Find trusted professionals near you.
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid gap-6 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((p, i) => (
              <ServiceProviderCard key={i} provider={p} />
            ))}
            {providers.length === 0 && (
              <p className="text-center col-span-full text-gray-500  mt-6">
                😔 No providers found in this category.
              </p>
            )}
          </div>
        </Suspense>
      </div>
      <Link
        href="/service-provider"
        className="fixed bottom-6 right-13 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105 text-sm font-medium z-50"
      >
        Register as Provider
      </Link>
    </div>
  );
}
