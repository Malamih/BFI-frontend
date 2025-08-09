"use client";
import { Accordion } from "@/components/ui/accordion";
import { HeroSection } from "@/components/ui/dashboard/sections/HeroSection";
import { useGetPages } from "@/services/page-content";
import { NewsAndMediaPage } from "@/types/pages";

export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "news_and_media" });
  const newsPage = data?.payload[0] as NewsAndMediaPage;

  return (
    <section>
      <Accordion type="multiple" disabled={isFetching}>
        <HeroSection
          section={newsPage?.sections?.hero}
          page="news_and_media"
          sectionName="hero"
        />
      </Accordion>
    </section>
  );
};
