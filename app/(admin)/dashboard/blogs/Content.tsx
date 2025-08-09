"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BLog } from "./components/Blog";
import { useGetBlogs } from "@/services/blogs";
import { useGetCategories } from "@/services/categories";
import { useGetWriters } from "@/services/writers";
import { CreateCategory } from "./components/CreateCategory";
import { CreateWriter } from "./components/CreateWriter";
import { CreateBlog } from "./components/CreateBlog";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWriter, setSelectedWriter] = useState("");

  const { data } = useGetBlogs({
    query: {
      search,
      category: selectedCategory === "all" ? "" : selectedCategory,
      writer: selectedWriter === "all" ? "" : selectedWriter,
    },
  });
  const { data: categories } = useGetCategories({ query: {} });
  const { data: writers } = useGetWriters({ query: {} });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(inputValue);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <section>
      {/* Header */}
      <div className="header flex flex-wrap justify-between gap-5 mb-6">
        <Input
          placeholder="Search by blog title"
          className="w-full max-w-xl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="btn flex flex-wrap gap-2">
          {/* Categories */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-gray-500 rounded-sm w-48">
              <SelectValue placeholder="Filter By Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.payload?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name} / {category?.blogs}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Writers */}
          <Select value={selectedWriter} onValueChange={setSelectedWriter}>
            <SelectTrigger className="border-gray-500 rounded-sm w-48">
              <SelectValue placeholder="Filter By Writer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Writers</SelectItem>
              {writers?.payload?.map((writer) => (
                <SelectItem key={writer._id} value={writer._id}>
                  {writer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <CreateCategory />
          <CreateWriter />
          <CreateBlog />
        </div>
      </div>

      {/* Blogs */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.payload?.map((blog, i) => {
          return <BLog data={blog} key={i} />;
        })}
      </div>

      {/* No blogs found */}
      {data?.payload?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No blogs found
          </h3>
          <p className="text-gray-600 mb-4">
            {inputValue || selectedCategory || selectedWriter
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first blog post."}
          </p>
          <CreateBlog />
        </div>
      )}
    </section>
  );
};
