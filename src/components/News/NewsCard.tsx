"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, Globe } from "lucide-react";
import { PaginationComponent } from "../PaginationComponent";

interface NewsArticle {
  articleId: string;
  title: string;
  summary: string;
  publishedDate: string;
  link: string;
  sourceName?: string;
  keywords?: string[];
}

interface PaginatedResponse {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: NewsArticle[];
}

function stripHtmlTags(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const NewsCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read 'page' param, fallback to 1
  const pageParam = searchParams.get("page");
  let page = pageParam ? parseInt(pageParam, 10) : 1;
  if (isNaN(page) || page < 1) page = 1;

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 9; // fixed page size to 9

  const fetchNews = async (pageNumber: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/news/external?page=${pageNumber}&pageSize=${pageSize}`
      );

      if (!res.ok) {
        let msg = `HTTP error! status: ${res.status}`;
        try {
          const errData = await res.json();
          if (errData && errData.message) msg = errData.message;
        } catch {}

        throw new Error(msg);
      }

      const data: PaginatedResponse = await res.json();
      setArticles(data.items ?? []);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      console.error("Error fetching news:", err);
      setArticles([]);
      setError(err.message || "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };
  // Redirect user back if page is too high
  if (totalPages > 0 && page > totalPages) {
    router.replace("/news?category=&page=1");
  }

  // Fetch news only if page is valid
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/external?page=${page}&pageSize=${pageSize}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: PaginatedResponse) => {
        setArticles(data.items ?? []);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!articles || articles.length === 0) return <div>No news available</div>;

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {articles.map((news) => (
          <div
            key={news.link}
            className="flex flex-col justify-between bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 p-4 w-full h-full"
          >
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-indigo-700 hover:underline line-clamp-2 mb-2"
            >
              {news.title}
            </a>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {stripHtmlTags(news.summary) || "No description available."}
            </p>
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

      <div className="flex justify-center pt-4">
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          category=""
        />
      </div>
    </>
  );
};

export default NewsCard;
