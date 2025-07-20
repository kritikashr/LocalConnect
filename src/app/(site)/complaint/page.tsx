import CategoryFilter from "@/components/CategoryFilter";
import ComplaintCard from "@/components/Complaint/ComplaintCard";
import { PaginationComponent } from "@/components/PaginationComponent";
import { getComplaints } from "@/lib/api";
import { Complaint } from "@/lib/type";
import Link from "next/link";

const Page = async ({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) => {
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
  const currentPage = parseInt(params.page || "1", 10);

  const pageSize = 10;

  // Fetch complaints and total pages from the backend
  const { complaints, totalPages } = await getComplaints(
    category,
    currentPage,
    pageSize
  );

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-gray-800">Complaints</h1>
          <CategoryFilter selectedCategory={category} categories={categories} />
        </div>

        {/* Display complaints */}
        <div>
          {complaints.length === 0 && (
            <p className="text-center col-span-full text-gray-500 mt-10">
              😔 No complaints found in this category.
            </p>
          )}
          {complaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>

        {/* Pagination Component */}
        <div className="flex justify-center pt-4">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
          />
        </div>
        <Link
          href="/file-complaint"
          className="fixed bottom-6 right-13 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105 text-sm font-medium z-50"
        >
          File your complaint
        </Link>
      </div>
    </div>
  );
};

export default Page;
