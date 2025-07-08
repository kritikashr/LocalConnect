import ServiceProviderCard from "@/components/service/ServiceProviderCard";
import CategoryFilter from "@/components/service/CategoryFilter";
import { Provider } from "@/lib/type";
import { getApprovedServiceProviders, getUserSession } from "@/lib/api";


interface PageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ServiceProviderPage({ searchParams }: PageProps) {
  const category = searchParams.category || "All";

  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;
  const providers = await getApprovedServiceProviders(category,session.accessToken);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Service Providers
        </h1>

        <CategoryFilter selectedCategory={category} />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {providers.map((p, i) => (
            <ServiceProviderCard key={i} provider={p} />
          ))}
          {providers.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No providers found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
