"use client";

import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
}

const categories = ["All", "Plumbing", "Electrician", "Cleaning"];

export default function CategoryFilter({
  selectedCategory,
}: CategoryFilterProps) {
  return (
    <form method="GET" className="flex justify-center">
      <select
        name="category"
        defaultValue={selectedCategory}
        className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
        onChange={(e) => e.currentTarget.form?.submit()}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </form>
  );
}
