import NewsCard from "@/components/News/NewsCard";
import Link from "next/link";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="px-15 py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Latest News</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <NewsCard />
      </Suspense>
      <Link
        href="/file-complaint"
        className="fixed bottom-6 right-13 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105 text-sm font-medium z-50"
      >
        File your complaint
      </Link>
    </div>
  );
};

export default page;
