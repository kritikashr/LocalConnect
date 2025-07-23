"use client";
import { useEffect, useState } from "react";
import { getNotices } from "@/lib/api";
import { Notice } from "@/lib/type";

const Header = () => {
  const [news, setNews] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNotices();
      setNews(data.slice(0, 3));
    };

    fetchNews();
  }, []);

  return (
    <div className="text-sm font-semibold text-white bg-primary py-3 flex justify-center gap-4">
      Latest News:{" "}
      {news.length > 0
        ? news.map((item, index) => (
            <span key={item.id} >
              {item.title}
              <span className="ml-4">{index < news.length - 1 && " • "}{" "}</span>
            </span>
          ))
        : "Loading..."}
    </div>
  );
};

export default Header;
