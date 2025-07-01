import { getNotices } from "@/lib/api";
import React, { use } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { handleDeleteNews } from "./action";

const ManageNews: React.FC = () => {
  const notices = use(getNotices());
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold">Manage Service Requests</h2>
      <Link href="/admin/news/add">
        <Button className="mt-4 mb-1 rounded-none text-base bg-white text-black border hover:bg-gray-200">
          Add News
        </Button>
      </Link>
      <table className="min-w-full border border-gray-300 text-sm w-full mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Title</th>
            <th className="border px-3 py-4">Date</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Location</th>
            <th className="border px-3 py-4">Contact</th>
            <th className="border px-3 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice: any) => (
            <tr key={notice.id}>
              <td className="border px-3 py-4 text-center">{notice.id}</td>
              <td className="border px-3 py-4">{notice.title}</td>
              <td className="border px-3 py-4">
                {format(notice.date, "dd MMM yyyy, hh:mm a")}
              </td>
              <td className="border px-3 py-4">{notice.description}</td>
              <td className="border px-3 py-4">{notice.location}</td>
              <td className="border px-3 py-4">{notice.contact}</td>
              <td className="border px-3 h-full text-center">
                <form action={handleDeleteNews}>
                  <input type="hidden" name="userId" value={notice.id} />
                  <button className="bg-red-600 text-white px-3 py-1 rounded ">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNews;
