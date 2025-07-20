
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const PaginationComponent = ({
  currentPage,
  totalPages,
  category,
}: {
  currentPage: number;
  totalPages: number;
  category: string;
}) => {
  const generatePageLinks = () => {
    const pageLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?category=${category}&page=${i}`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageLinks;
  };

  return (
    <div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?category=${category}&page=${currentPage - 1}`}
          />
        </PaginationItem>

        {generatePageLinks()}

        <PaginationItem>
          <PaginationNext
            href={`?category=${category}&page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

