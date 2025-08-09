"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetProjects } from "@/services/projects";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Project } from "./components/Project";
import { CreateButton } from "./components/CreateButton";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, isPending } = useGetProjects({
    query: {
      search,
      page: currentPage,
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(inputValue);
      // Reset to page 1 when search changes
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = data?.lastPage || 1;
    const current = currentPage;

    // Always show first page
    if (current > 3) {
      pages.push(1);
    }

    // Show ellipsis if there's a gap
    if (current > 4) {
      pages.push("ellipsis-start");
    }

    // Show pages around current page
    for (
      let i = Math.max(1, current - 1);
      i <= Math.min(totalPages, current + 1);
      i++
    ) {
      pages.push(i);
    }

    // Show ellipsis if there's a gap
    if (current < totalPages - 3) {
      pages.push("ellipsis-end");
    }

    // Always show last page
    if (current < totalPages - 2) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section>
      <div className="header flex items-center justify-between gap-4">
        <Input
          placeholder="Type to search in projects"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full max-w-xl"
        />

        <div className="opts">
          <CreateButton />
        </div>
      </div>

      {/* Projects Grid */}
      {!isPending && data?.payload && data?.payload.length > 0 && (
        <ul className="projects mt-5 grid grid-cols-[repeat(auto-fill,minmax(656px,1fr))] gap-4">
          {data.payload.map((project, i: number) => {
            return <Project data={project} key={project._id || i} />;
          })}
        </ul>
      )}

      {/* No Projects Found State */}
      {!isPending &&
        !isFetching &&
        data?.payload &&
        data?.payload.length === 0 && (
          <div className="flex items-center justify-center py-12 mt-5">
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No Projects Found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {search
                  ? `No projects match "${search}"`
                  : "Get started by creating your first project."}
              </p>
              {!search && (
                <div className="mt-4">
                  <CreateButton />
                </div>
              )}
            </div>
          </div>
        )}

      {/* Loading State */}
      {isPending && (
        <div className="flex items-center justify-center py-12 mt-5">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading projects...</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!isPending &&
        data?.payload &&
        data?.payload.length > 0 &&
        data?.lastPage &&
        data?.lastPage > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis-start" || page === "ellipsis-end" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page as number);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < (data?.lastPage || 1)) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage === (data?.lastPage || 1)
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

      {/* Optional: Show pagination info */}
      {!isPending && data?.payload && data?.payload.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing page {data?.page} of {data?.lastPage}(
          {data?.total ? `${data.total} total projects` : ""})
        </div>
      )}
    </section>
  );
};
