"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPrograms } from "@/services/programs";
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProgramRow } from "./components/ProgramRow";
import Link from "next/link";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(14); // Items per page

  const { data, isFetching } = useGetPrograms({
    query: {
      search,
      page: currentPage,
      limit: pageSize,
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(inputValue);
      setCurrentPage(1); // Reset to first page when searching
    }, 400);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Calculate pagination info
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <section>
      <div className="header flex items-center justify-between gap-5">
        <Input
          placeholder="Search by name."
          className="w-full max-w-xl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="otps">
          <Link href={"/dashboard/programs/create"}>
            <Button>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>

      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Program</TableHead>
            <TableHead className="w-[300px] text-center">Jurors</TableHead>
            <TableHead className="w-[300px] text-center">Partners</TableHead>
            <TableHead className="w-[300px] text-center">Projects</TableHead>
            <TableHead className="w-[200px] text-center">Details</TableHead>
            <TableHead className="w-[200px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.payload?.map((program) => {
            return <ProgramRow data={program} key={program?._id} />;
          })}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {totalItems} results
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {/* First page */}
              {generatePageNumbers()[0] > 1 && (
                <>
                  <Button
                    variant={currentPage === 1 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => goToPage(1)}
                    className="w-10"
                  >
                    1
                  </Button>
                  {generatePageNumbers()[0] > 2 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                </>
              )}

              {/* Visible page numbers */}
              {generatePageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}

              {/* Last page */}
              {generatePageNumbers()[generatePageNumbers().length - 1] <
                totalPages && (
                <>
                  {generatePageNumbers()[generatePageNumbers().length - 1] <
                    totalPages - 1 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant={currentPage === totalPages ? "default" : "ghost"}
                    size="sm"
                    onClick={() => goToPage(totalPages)}
                    className="w-10"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isFetching && (
        <div className="mt-6 text-center text-muted-foreground">
          Loading programs...
        </div>
      )}

      {/* No results state */}
      {!isFetching && data?.payload?.length === 0 && (
        <div className="mt-6 text-center text-muted-foreground">
          {search ? `No programs found for "${search}"` : "No programs found"}
        </div>
      )}
    </section>
  );
};
