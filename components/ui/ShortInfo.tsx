import { Writer } from "@/types/blogs";
import Image from "next/image";

export const ShortInfo = ({ data, date }: { data: Writer; date: string }) => {
  return (
    <div className="w-full flex items-center gap-5 text-base font-medium leading-4 text-[#97989F]">
      <div className="flex items-center gap-3">
        <Image
          src={data?.profilePicture?.secure_url}
          width={100}
          height={100}
          alt="bloger"
          className="w-[36px] h-[36px] rounded-full"
        />
        <span>{data?.name}</span>
      </div>
      <span>{date}</span>
    </div>
  );
};
