import CategoryFilter from "@/components/CategoryFilter";
import { getComplaints } from "@/lib/api";
import ComplaintCard from "@/components/Complaint/ComplaintCard";

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
    "request",
    "offer",
    "aid_related",
    "medical_help",
    "medical_products",
    "search_and_rescue",
    "security",
    "military",
    "water",
    "food",
    "shelter",
    "clothing",
    "money",
    "missing_people",
    "refugees",
    "death",
    "other_aid",
    "infrastructure_related",
    "transport",
    "buildings",
    "electricity",
    "tools",
    "hospitals",
    "shops",
    "aid_centers",
    "other_infrastructure",
    "weather_related",
    "floods",
    "storm",
    "fire",
    "earthquake",
    "cold",
    "other_weather",
    "direct_report",
  ];

  const complaints = await getComplaints(category);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className=" mx-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-gray-800">Complaints</h1>
          <CategoryFilter selectedCategory={category} categories={categories} />
        </div>

        <div>
          {complaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
          {complaints.length === 0 && (
            <p className="text-center col-span-full text-gray-500  mt-6">
              😔 No providers found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
