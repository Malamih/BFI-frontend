"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetJurors } from "@/services/jurors";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Juror } from "./components/Juror";
import { CreateButton } from "./components/CreateButton";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetJurors({
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
    }, 300);
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
      <div className="header flex items-center justify-between gap-5">
        <Input
          placeholder="Search in jurors"
          className="w-full max-w-xl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <div className="options">
          <CreateButton />
        </div>
      </div>

      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead className="w-[200px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {data?.payload && data?.payload?.length > 0 && (
          <TableBody>
            {data?.payload?.map((juror, i: number) => {
              return <Juror data={juror} key={juror._id || i} />;
            })}
          </TableBody>
        )}
        {!isFetching && data?.payload && data?.payload?.length < 1 && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <h1 className="font-normal text-lg text-center py-4 text-gray-500">
                  No Jurors Found
                </h1>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

      {/* Pagination */}
      {data?.payload && data?.payload?.length > 0 && data?.lastPage > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
      {data?.payload && data?.payload?.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing page {data?.page} of {data?.lastPage} ({data?.total} total
          jurors)
        </div>
      )}
    </section>
  );
};
