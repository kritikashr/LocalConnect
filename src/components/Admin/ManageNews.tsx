import { getNotices } from "@/lib/api";
import React, { use } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { format } from "date-fns";

const ManageNews: React.FC = () => {
  const notices = use(getNotices());
  return (
    <div className="p-4">
      <Link href="/admin/addNews">
        <Button className="my-5">Add News</Button>
      </Link>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice: any) => (
            <tr key={notice.id}>
              <td className="border px-3 py-1 text-center">{notice.id}</td>
              <td className="border px-3 py-1">{notice.title}</td>
              <td className="border px-3 py-1">
                {format(notice.date, "dd MMM yyyy, hh:mm a")}
              </td>
              <td className="border px-3 py-1">{notice.description}</td>
              <td className="border px-3 py-1">{notice.location}</td>
              <td className="border px-3 py-1">{notice.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNews;
