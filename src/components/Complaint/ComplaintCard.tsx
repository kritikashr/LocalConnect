"use client";

import * as React from "react";
import { complaints } from "@/lib/complaint";
import { GrLocationPin } from "react-icons/gr";
import { DropdownRadioFilter } from "../ui/DropdownRadioFilter"; 

const categoryOptions = [
  { label: "All Categories", value: "" },
  { label: "Water", value: "water" },
  { label: "Electricity", value: "electricity" },
  { label: "Sanitation", value: "sanitation" },
  { label: "Fire", value: "fire" },
  // add more if needed
];

const urgencyOptions = [
  { label: "All Urgency", value: "" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

export default function SanitationCardList() {
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [urgencyFilter, setUrgencyFilter] = React.useState("");

  // Filter complaints based on selected filters
  const filteredComplaints = complaints.filter((item) => {
    return (
      (categoryFilter === "" || item.category === categoryFilter) &&
      (urgencyFilter === "" || item.urgency === urgencyFilter)
    );
  });

  return (
    <div className="mx-10 py-5">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <DropdownRadioFilter
          label="Category"
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <DropdownRadioFilter
          label="Urgency"
          options={urgencyOptions}
          value={urgencyFilter}
          onChange={setUrgencyFilter}
        />
      </div>

      {/* Complaint cards */}
      {filteredComplaints.length === 0 && (
        <p className="text-center text-gray-500">No complaints found.</p>
      )}
      {filteredComplaints.map((item) => (
        <div
          key={item.id}
          className="my-5 p-4 rounded-xl flex flex-col gap-1 bg-[#969696]"
        >
          <p className="font-bold">{item.name}</p>
          <p className="text-xl font-semibold">{item.message}</p>
          <div className="flex justify-between text-sm">
            <span className="capitalize">{item.category}</span>
            <span className="flex items-center gap-1">
              <GrLocationPin size={20} />
              {item.location}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-200 mt-1">
            <span>Urgency: {item.urgency}</span>
            <span>{item.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
