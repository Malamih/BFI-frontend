"use client";
import Container from "@/components/Container";
import { ShortInfo } from "@/components/ui/ShortInfo";
import VimeoPlayer from "@/components/VideoPlayer";
import { useGetBlog } from "@/services/blogs";
import { extractId } from "@/services/vimeo";
import { Writer } from "@/types/blogs";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Content = ({ id }: { id: string }) => {
  const { data } = useGetBlog(id);
  return (
    <section>
      {data && (
        <Container className="pt-16 max-sm:pt-12 pb-12">
          <div className="mb-8">
            <div className="mb-2 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-sm w-fit h-fit">
              <span>{data?.payload?.category?.name}</span>
            </div>
            <h1 className="font-semibold text-4xl leading-10 mb-3 max-sm:text-3xl max-sm:leading-8">
              {data?.payload?.title}
            </h1>
            <ShortInfo
              data={data?.payload?.writtenBy as Writer}
              date={new Date(data?.payload?.createdAt as string).toDateString()}
            />
          </div>
          <div className="mb-8">
            {!data?.payload?.video ||
            typeof data?.payload?.video != "string" ? (
              <img
                src={
                  data?.payload?.thumbnail.secure_url ||
                  "/news-and-media/blog/placeholder.jpg"
                }
                width={4000}
                height={4000}
                alt="Banner"
                className="w-full h-[500px] object-cover rounded-xl"
              />
            ) : (
              <VimeoPlayer
                videoId={extractId(data?.payload?.video as string) as string}
              />
            )}
          </div>
          <div
            className="[&_ul]:[list-style:unset]"
            dangerouslySetInnerHTML={{
              __html: (data?.payload?.body as string) || "",
            }}
          ></div>
        </Container>
      )}
    </section>
  );
};
