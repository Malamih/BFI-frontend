"use client";
import Container from "@/components/Container";
import { useGetProject } from "@/services/projects";
import Image from "next/image";

export const Content = ({ projectId }: { projectId?: string }) => {
  const { data } = useGetProject(projectId as string);
  return (
    <section className="py-12">
      <Container>
        <div className="thumbnail relative w-full h-[calc(50vh-var(--header-height))] min-h-[500px] max-h-[1000px] border border-gray-500/30">
          {data?.payload && (
            <Image
              src={data?.payload?.cover_image?.secure_url}
              fill
              alt={data?.payload?.title}
              className="object-cover"
            />
          )}
        </div>
        <h1 className="font-semibold text-4xl my-6">{data?.payload?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.payload?.description as string,
          }}
        ></div>
      </Container>
    </section>
  );
};
