"use client";
import Container from "@/components/Container";
import { Blog } from "./components/Blog";
import { Button } from "@/components/ui/button";
import { useGetBlogs } from "@/services/blogs";
import { useState, useCallback, useEffect } from "react";

export const Blogs = () => {
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const limit = 8; // Number of blogs per page

  const { data, isLoading, refetch } = useGetBlogs({
    query: {
      page,
      limit,
    },
  });

  // Update blogs when new data is received
  useEffect(() => {
    if (data?.payload) {
      if (page === 1) {
        // First load - replace all blogs
        setAllBlogs(data.payload);
      } else {
        // Load more - append new blogs
        setAllBlogs((prev) => [...prev, ...data.payload]);
      }

      // Check if there are more blogs to load
      // Assuming your API returns less blogs than limit when no more data
      setHasMore(data.payload.length === limit);

      // Alternative: if your API provides total count
      // setHasMore(allBlogs.length + data.payload.length < data.total);
    }
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  // Reset pagination when component mounts or when you want to refresh
  const handleRefresh = useCallback(() => {
    setPage(1);
    setAllBlogs([]);
    setHasMore(true);
    refetch();
  }, [refetch]);

  return (
    <section className="overflow-hidden">
      <Container className="mb-14 !px-0">
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-5 mb-8">
          {allBlogs.map((blog, i: number) => {
            return <Blog key={blog.id || blog._id || i} data={blog} />;
          })}
        </div>

        {/* Show Load More button only if there are more blogs to load */}
        {hasMore && (
          <div className="flex items-center justify-center w-full">
            <Button
              className="m-auto border-[#696A75] bg-background text-[#696A75] hover:bg-background hover:text-[#696A75]"
              variant={"outline"}
              size={"lg"}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}

        {/* Optional: Show message when all blogs are loaded */}
        {!hasMore && allBlogs.length > 0 && (
          <div className="flex items-center justify-center w-full">
            <p className="text-[#696A75] text-sm">
              You've reached the end of all blogs
            </p>
          </div>
        )}

        {/* Optional: Show message when no blogs at all */}
        {!isLoading && allBlogs.length === 0 && (
          <div className="flex items-center justify-center w-full">
            <p className="text-[#696A75] text-sm">No blogs available</p>
          </div>
        )}
      </Container>
    </section>
  );
};
