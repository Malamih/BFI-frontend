"use client";

import Container from "@/components/Container";
import { useGetBlogs } from "@/services/blogs";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MasonryEffect() {
  const { data } = useGetBlogs({ query: { limit: 13 } });
  return (
    <section>
      <Container>
        <div className="flex flex-wrap justify-center gap-2 content-start overflow-hidden p-5">
          {data?.payload.map((blog, i) => (
            <div
              key={i}
              className="overflow-hidden relative rounded-md shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ height: 183 }}
            >
              {blog?.video && (
                <div className="absolute top-2/4 left-2/4 pointer-events-none -translate-x-2/4 -translate-y-2/4 z-10 text-primary flex items-center justify-center w-[50px] h-[30px] bg-white border-2 border-primary">
                  <PlayIcon width={19} />
                </div>
              )}
              <Link href={`/news&media/blogs/${blog?._id}`}>
                <img
                  src={blog?.thumbnail?.secure_url}
                  width={1000}
                  height={1000}
                  className="h-[183px] w-auto object-cover"
                  alt={`Image ${i + 1}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
