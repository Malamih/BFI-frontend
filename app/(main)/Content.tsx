"use client";
import { Intro } from "./Intro";
import { CannesEvent } from "./CannesEvent";
import { Hero } from "./Hero";
import { About } from "./About";
import { CorePillars } from "./CorePillars";
import { Fundations } from "./Fundations";
import { ResourcesAndIndustry } from "./ResourcesAndIndustry";
import { useGetPages } from "@/services/page-content";
import { HomePage } from "@/types/pages";

export const Content = () => {
  const { data } = useGetPages({ name: "home" });
  const sections = data?.payload[0]?.sections as HomePage["sections"];
  return (
    <main className="page">
      <Hero section={sections?.hero} />
      <Intro section={sections?.intro} />
      <CannesEvent section={sections?.bfiCannes} />
      <About section={sections?.about} />
      <CorePillars section={sections?.corePillars} />
      <Fundations section={sections?.overview} />
      <ResourcesAndIndustry section={sections?.resources_and_industry_tools} />
    </main>
  );
};
