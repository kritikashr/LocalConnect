import { getNotices } from "@/lib/api";
import { GrLocationPin } from "react-icons/gr";
import React, { use } from "react";
import { Notice } from "@/lib/type";
import { format } from "date-fns";
import { Smartphone } from "lucide-react";

const NewsCard = async() => {
  const notices = await getNotices();

  return (
    <>
      {notices.map((notice: Notice) => (
        <div
          key={notice.id}
          className="my-5 p-6 rounded flex flex-col gap-4 bg-white shadow-md hover:shadow-lg transition-all"
        >
          <p className="text-xl font-bold text-gray-800">{notice.title}</p>
          <p className="text-lg text-gray-700">{notice.description}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="capitalize flex items-center gap-1">
              <Smartphone  size={18} className=" text-gray-500" />
              {notice.contact}
            </span>
            <span className="flex items-center gap-1">
              <GrLocationPin size={18} className="text-gray-500" />
              {notice.location}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 ">
            <span>{format(notice.date, "dd MMM yyyy, hh:mm a")}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsCard;
