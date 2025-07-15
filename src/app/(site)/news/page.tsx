import NewsCard from "@/components/News/NewsCard";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="px-15 py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Latest News</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <NewsCard />
      </Suspense>
    </div>
  );
};

export default page;
