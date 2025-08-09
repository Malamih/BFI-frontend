"use client";
import { Hero } from "./Hero";
import { Blogs } from "./Blogs";
import MasonryCarousel from "./Gallery";
import { useGetPages } from "@/services/page-content";
import { NewsAndMediaPage } from "@/types/pages";
export const Content = () => {
  const { data } = useGetPages({ name: "news_and_media" });
  const sections = data?.payload[0]?.sections as NewsAndMediaPage["sections"];
  return (
    <main>
      <Hero section={sections?.hero} />
      <MasonryCarousel />
      <Blogs />
    </main>
  );
};
