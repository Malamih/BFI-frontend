"use client";

import { Accordion } from "@/components/ui/accordion";
import { useGetPages } from "@/services/page-content";
import { BfiCannes } from "./BfiCannes";
import { About } from "./About";
import { HeroSection } from "@/components/ui/dashboard/sections/HeroSection";
import { SimpleSection } from "@/components/ui/dashboard/sections/SimpleSection";
import { HomePage } from "@/types/pages";
import { Item, ItemsBox } from "@/components/ui/dashboard/sections/ItemsBox";
import { CorePillars } from "./CorePillars";
import { ResourcesAndIndustryTools } from "./ResourcesAndIndustryTools";

export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "home" });
  const page = data?.payload[0] as HomePage;
  return (
    <section>
      <Accordion type="multiple" disabled={isFetching}>
        <HeroSection
          section={page?.sections?.hero}
          page="home"
          sectionName="hero"
        />
        <SimpleSection
          section={page?.sections?.intro}
          page="home"
          sectionName="intro"
        />
        <BfiCannes section={page?.sections?.bfiCannes} />
        <About section={page?.sections?.about} />
        <CorePillars
          page="home"
          section="corePillars"
          sectionValue={page?.sections?.corePillars}
        />
        <ItemsBox
          page="home"
          sectionName="Partners, mission, vision"
          items={["partners", "mission", "vision"]}
          section="overview"
          haveIcons
          sectionValue={page?.sections?.overview as Record<string, Item>}
        />
        <ResourcesAndIndustryTools
          page="home"
          section="resources_and_industry_tools"
          sectionValue={page?.sections?.resources_and_industry_tools}
        />
      </Accordion>
    </section>
  );
};
