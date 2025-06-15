import NewsCard from "@/components/News/NewsCard";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsCard />
      </Suspense>
    </div>
  );
};

export default page;
