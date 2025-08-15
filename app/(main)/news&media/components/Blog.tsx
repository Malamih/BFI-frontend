import { Button } from "@/components/ui/button";
import { BlogType } from "@/types/blogs";
import Image from "next/image";
import Link from "next/link";

export const Blog = ({
  blogData,
  showBody,
}: {
  blogData: BlogType;
  showBody?: boolean;
}) => {
  return (
    <div className="w-full flex flex-col flex-[1] rounded-xl overflow-hidden min-w-xs max-w-3xl">
      <Image
        src={blogData?.thumbnail?.secure_url}
        width={1000}
        height={1000}
        className="w-full h-[260px] object-cover rounded-xl mb-5"
        alt="thumbnail"
        unoptimized
      />
      <h4 className="font-semibold text-2xl mb-2 flex-[1]">
        {blogData?.title}
      </h4>
      {!showBody && (
        <Link href={`/news&media/blogs/${blogData?._id}`}>
          <Button variant={"ghost"} className="w-fit underline text-lg">
            Read More
          </Button>
        </Link>
      )}
      {showBody && (
        <p
          className="font-normal text-lg leading-[135%] text-[#737373]"
          dangerouslySetInnerHTML={{
            __html:
              blogData?.body?.length > 200
                ? blogData?.body?.slice(0, 200) +
                  buttonEl(blogData?._id as string)
                : blogData?.body,
          }}
        ></p>
      )}
    </div>
  );
};

const buttonEl = (id: string) => {
  return `<a href="/news&media/blogs/${id}"><button style="padding: 1rem .5rem; background: transparent; color: #09C791; font-weight: 600; text-decoration:underline; cursor: pointer;">Read More</button></a>`;
};
