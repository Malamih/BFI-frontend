"use client";
import Container from "@/components/Container";
import PersonIcon from "@/assets/icons/person.svg";
import Image from "next/image";
import { useGetBlogs } from "@/services/blogs";

export const Hero = () => {
  const { data } = useGetBlogs({ query: { limit: 1 } });
  const blog = data?.payload[0];
  return (
    <section className="my-12 h-[calc(75vh-var(--header-height))] mx-4">
      <Container className="relative h-full flex items-end rounded-2xl overflow-hidden bg-black max-sm:w-[90%] max-sm:p-0">
        <img
          src={blog?.thumbnail?.secure_url || "/news-and-media/blogs/hero.webp"}
          width={1000}
          height={1000}
          alt="hero"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
        />
        <div className="relative z-10 m-10">
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-md mb-4 inline-block font-medium text-sm leading-5">
            {blog?.category?.name}
          </span>
          <h1 className="font-semibold text-4xl mb-6 leading-10 text-white max-md:text-3xl max-md:text-center">
            {blog?.title}
          </h1>
          <div className="text-white flex items-center gap-5 text-base font-medium leading-6">
            <div className="flex items-center gap-3">
              {blog?.writtenBy?.profilePicture && (
                <Image
                  src={blog?.writtenBy?.profilePicture?.secure_url as string}
                  width={100}
                  height={100}
                  alt="bloger"
                  className="w-[36px] h-[36px] rounded-full"
                />
              )}
              <span>{blog?.writtenBy?.name}</span>
            </div>
            <span>{new Date(blog?.createdAt as string).toDateString()}</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
