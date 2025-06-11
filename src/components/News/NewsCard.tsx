import { getNotices } from "@/lib/api";

import { GrLocationPin } from "react-icons/gr";

import React, { use } from "react";
import { Notice } from "@/lib/type";
import { format } from "date-fns";

const NewsCard = () => {
  const notices = use(getNotices());
  return (
    <>
      {notices.map((notice: Notice) => (
        <div
          key={notice.id}
          className="my-5 p-4 rounded-xl flex flex-col gap-1 bg-[#969696]"
        >
          <p className="font-bold">{notice.title}</p>
          <p className="text-xl font-semibold">{notice.description}</p>
          <div className="flex justify-between text-sm">
            <span className="capitalize">{notice.contact}</span>
            <span className="flex items-center gap-1">
              <GrLocationPin size={20} />
              {notice.location}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-200 mt-1">
            <span>{format(notice.date, "dd MMM yyyy, hh:mm a")}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsCard;
