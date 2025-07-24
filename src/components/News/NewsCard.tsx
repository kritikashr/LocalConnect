"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Globe } from "lucide-react";

interface NewsArticle {
  articleId: string;
  title: string;
  summary: string;
  publishedDate: string;
  link: string;
  sourceName?: string;
  keywords?: string[];
}

function stripHtmlTags(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const NewsCard = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/external`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: NewsArticle[]) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (articles.length === 0) return <div>No news available</div>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {articles.map((news) => (
        <div
          key={news.link}
          className="flex flex-col justify-between bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 p-4 w-full max-w-sm mx-auto h-full"
        >
          {/* Title */}
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-indigo-700 hover:underline line-clamp-2 mb-2"
          >
            {news.title}
          </a>

          {/* Summary with HTML stripped */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {stripHtmlTags(news.summary) || "No description available."}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3 mt-auto">
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{news.sourceName || "Unknown"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(news.publishedDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
