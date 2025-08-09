import { ShortInfo } from "@/components/ui/ShortInfo";
import { BlogType } from "@/types/blogs";
import Link from "next/link";

export const Blog = ({ data }: { data: BlogType }) => {
  return (
    <Link
      href={`/news&media/blogs/${data?._id}`}
      className="p-4 bg-white rounded-2xl flex flex-col shadow hover:opacity-90 hover:scale-[1.01] transition cursor-pointer"
    >
      <img
        loading="lazy"
        src={data?.thumbnail?.secure_url}
        width={1000}
        height={1000}
        alt="blog"
        className="w-full h-[240px] object-cover mb-4 rounded-md"
      />
      <div className="content flex flex-col flex-[1]">
        <div className="category px-2 py-1 bg-[#4B6BFB0D] text-sm leading-5 text-primary rounded-sm mb-4 w-fit">
          <span>{data?.category?.name}</span>
        </div>
        <h3 className="text-2xl flex-[1] font-semibold leading-7 text-[#181A2A] mb-5">
          {data?.title}
        </h3>
        <ShortInfo
          data={data?.writtenBy}
          date={new Date(data?.createdAt as string).toDateString()}
        />
      </div>
    </Link>
  );
};
