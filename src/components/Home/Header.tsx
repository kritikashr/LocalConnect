"use client";
import { useEffect, useState } from "react";
import { getNotices } from "@/lib/api";
import { Notice } from "@/lib/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Header = () => {
  const [news, setNews] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNotices();
      setNews(data.slice(0, 10));
    };

    fetchNews();
  }, []);

  return (
    <div className="text-sm font-semibold text-white bg-primary py-2 flex justify-center gap-4">
      Latest News:{" "}
      {news.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {news.map((item) => (
              <CarouselItem
                key={item.id}
                className="flex-none text-center text-sm  w-1/3 border-l-1"
              >
                {item.title}
              </CarouselItem>
              
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Header;
