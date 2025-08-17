"use client";
import { Accordion } from "@/components/ui/accordion";
import { HeroSection } from "@/components/ui/dashboard/sections/HeroSection";
import { Item, ItemsBox } from "@/components/ui/dashboard/sections/ItemsBox";
import { SimpleSection } from "@/components/ui/dashboard/sections/SimpleSection";
import { useGetPages } from "@/services/page-content";
import { AboutPage, OverviewItem } from "@/types/pages";
import { Overview } from "./Overview";

export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "about" });
  const aboutPage = data?.payload[0] as AboutPage;

  return (
    <section>
      <Accordion type="multiple" disabled={isFetching}>
        <HeroSection
          section={aboutPage?.sections?.hero}
          page="about"
          sectionName="hero"
        />
        <SimpleSection
          section={aboutPage?.sections?.who_we_are}
          page="about"
          sectionName="who_we_are"
        />
        <Overview
          page="about"
          sectionName="mission, vision, why bfi"
          items={["mission", "vision", "why_bfi"]}
          section="overview"
          haveIcons={false}
          sectionValue={aboutPage?.sections?.overview as any}
          image={aboutPage?.sections?.overview?.image as string}
        />
      </Accordion>
    </section>
  );
};
