import Container from "@/components/Container";
import { Layer } from "@/components/ui/Layer";
import { VimeoModalPlayer } from "@/components/VimeoPlayer";
import { extractId } from "@/services/vimeo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IndustryItems } from "../(admin)/dashboard/ResourcesAndIndustryTools";

interface Post {
  video: string;
}

export const ResourcesAndIndustry = ({
  section,
}: {
  section: { headline: string; description: string; items: IndustryItems[] };
}) => {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const posts: string[] = [
      "/home/posts/1.webp",
      "/home/posts/2.webp",
      "/home/posts/3.webp",
      "/home/posts/4.webp",
    ];

    setPosts(posts);
  }, []);
  return (
    <section className="bg-accent py-10">
      <Container className="flex justify-between gap-24 max-xl:flex-col">
        <div className="text">
          <h6 className="font-bold text-4xl leading-9 mb-8">
            {section?.headline}
          </h6>
          <div
            className="space-y-4 leading-relaxed font-normal text-base text-black/40"
            dangerouslySetInnerHTML={{ __html: section?.description }}
          ></div>
        </div>
        <ul
          className="grid grid-cols-2 grid-rows-2 max-sm:grid-cols-1 w-full"
          style={{ columnGap: "25px", rowGap: 40 }}
        >
          {!section?.items &&
            posts?.map((video, i: number) => {
              return (
                <li
                  key={i}
                  className="relative rounded-3xl overflow-hidden min-w-[236px] max-xl:min-w-full h-[225px]"
                >
                  <Layer variant={"primary"} className="z-10 opacity-[66%]" />
                  <Image
                    src={video}
                    fill
                    alt="Post"
                    className="object-cover z-0"
                  />
                </li>
              );
            })}
          {section?.items &&
            section?.items?.map((item, i: number) => {
              return (
                <li
                  key={i}
                  className="relative rounded-3xl overflow-hidden min-w-[236px] max-xl:min-w-full h-[225px]"
                >
                  <Layer className="z-10 opacity-60" />
                  {item?.type == "video" && (
                    <VimeoModalPlayer
                      videoId={extractId(item.value as string) as string}
                      containerClassName="w-full rounded-0 h-full"
                    >
                      <Layer className="z-10 opacity-60" />
                    </VimeoModalPlayer>
                  )}
                  {item?.type == "image" && (
                    <div className="bg-blue-50">
                      <Image src={item.value as string} fill alt="image" />
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </Container>
    </section>
  );
};
