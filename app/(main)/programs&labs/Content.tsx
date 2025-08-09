"use client";
import Container from "@/components/Container";
import { Loader } from "@/components/Loader";
import { useGetPrograms } from "@/services/programs";
import Link from "next/link";

export const Content = () => {
  const { data, isFetching } = useGetPrograms({ query: {} });
  return (
    <>
      <Loader hide={!isFetching} />
      <Container className="min-h-[calc(100vh-var(--header-height))] pt-24 flex justify-center z-10 relative">
        <section>
          {data?.payload?.map((program) => {
            return (
              <Link key={program?._id} href={`/programs&labs/${program?._id}`}>
                <div className="program z-10 relative px-4 py-2 bg-white rounded-lg font-medium">
                  <span>{program?.name}</span>
                </div>
              </Link>
            );
          })}
          {data && data?.payload?.length < 1 && (
            <h1 className="text-lg font-medium px-3 py-2 bg-white rounded-lg">
              No Programs Found
            </h1>
          )}
        </section>
      </Container>
    </>
  );
};
