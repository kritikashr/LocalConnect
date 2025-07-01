import { getNotices } from "@/lib/api";
import React, { use } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { format } from "date-fns";
import DeleteButton from "../ui/DeleteButton";
import { DeleteButtonWrapper } from "../ui/DeleteButtonWrapper";

const ManageNews: React.FC = () => {
  const notices = use(getNotices());
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold">Manage Service Requests</h2>
      <Link href="/admin/news/add">
        <Button className="mt-4 mb-1 rounded-none">Add News</Button>
      </Link>
      <table className="min-w-full border border-gray-300 text-sm w-full mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Contact</th>
            <th className="border px-3 py-2">Action</th>
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
              <td className="border px-3 py-1 text-center">
                <DeleteButtonWrapper id={notice.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNews;
