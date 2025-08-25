"use client";
import Container from "@/components/Container";
import { Loader } from "@/components/Loader";
import { Layer } from "@/components/ui/Layer";
import { useGetPages } from "@/services/page-content";
import { useGetPrograms } from "@/services/programs";
import { ProgramsAndLabsPage } from "@/types/pages";
import Image from "next/image";
import Link from "next/link";

export const Content = () => {
  const { data, isFetching } = useGetPrograms({ query: {} });
  const { data: page, isFetching: fetchingPage } = useGetPages({
    name: "programsAndLabs",
  });
  const sections = page?.payload[0]
    ?.sections as ProgramsAndLabsPage["sections"];
  return (
    <>
      <Image
        src={sections?.image || "/contact/hero.webp"}
        className="object-cover z-[1]"
        fill
        alt="hero-image"
      />
      <Layer className="opacity-90 z-[2]" />
      <Loader hide={!isFetching} />
      <Container className="min-h-[calc(100vh-var(--header-height))] pt-24 flex justify-center z-10 relative">
        <section className="flex flex-col gap-4">
          {data?.payload?.map((program) => {
            return (
              <Link key={program?._id} href={`/programs&labs/${program?._id}`}>
                <div className="program text-center z-10 relative px-4 py-2 bg-white rounded-lg font-medium">
                  <span>{program?.name}</span>
                </div>
              </Link>
            );
          })}
          {data && data?.payload?.length < 1 && (
            <h1 className="text-lg font-medium px-4 py-2 bg-white rounded-lg">
              There's no programs yet
            </h1>
          )}
        </section>
      </Container>
    </>
  );
};
