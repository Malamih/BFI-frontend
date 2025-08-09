"use client";

import { Intro } from "./Intro";
import { Hero } from "./Hero";
import { About } from "./About";
import { Gallery } from "./Gallery";
import { useGetPages } from "@/services/page-content";
import { AboutPage } from "@/types/pages";

export const Content = () => {
  const { data } = useGetPages({ name: "about" });
  const sections = data?.payload[0]?.sections as AboutPage["sections"];
  return (
    <main>
      <Hero section={sections?.hero} />
      <Intro section={sections?.who_we_are} />
      <About section={sections?.overview} />
      <Gallery />
    </main>
  );
};
