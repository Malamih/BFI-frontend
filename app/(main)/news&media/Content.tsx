"use client";
import { Hero } from "./Hero";
import { Blogs } from "./Blogs";
import MasonryCarousel from "./Gallery";
import { useGetPages } from "@/services/page-content";
import { NewsAndMediaPage } from "@/types/pages";
import { Loader } from "@/components/Loader";
export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "news_and_media" });
  const sections = data?.payload[0]?.sections as NewsAndMediaPage["sections"];
  return (
    <main>
      <Loader hide={!isFetching} />
      <Hero section={sections?.hero} />
      <MasonryCarousel />
      <Blogs />
    </main>
  );
};
