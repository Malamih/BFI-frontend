import { Juror } from "@/app/(admin)/dashboard/jurors/components/Juror";
import Image from "next/image";

export const Member = ({ data }: { data: Juror }) => {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={data?.image?.secure_url || "/programs-and-labs/jury/1.png"}
        width={1000}
        height={1000}
        alt="Jury"
        className="w-full h-auto object-cover min-h-[250px] max-h-[375px] rounded-4xl"
      />
      <div className="content">
        <h3 className="font-semibold text-xl leading-[140%]">{data?.name}</h3>
        <p className="font-normal text-lg leading-[140%]">{data?.company}</p>
      </div>
    </div>
  );
};
