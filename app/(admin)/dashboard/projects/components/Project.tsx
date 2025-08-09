import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/date";
import { queryClient } from "@/providers/queryProvider";
import { useDeleteProject } from "@/services/projects";
import { Project as ProjectType } from "@/types/projects";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { EditButton } from "./EditButton";

export const Project = ({ data }: { data: ProjectType }) => {
  const { mutateAsync, isPending } = useDeleteProject(data?._id);
  return (
    <div className="relative border border-gray-500/60 flex flex-col overflow-hidden rounded-sm">
      <div className="opts absolute top-2 right-2 z-10 flex flex-col gap-2">
        <Button
          variant={"destructive"}
          size={"sm"}
          disabled={isPending}
          onClick={async () => {
            await mutateAsync();
            queryClient.invalidateQueries({ queryKey: ["projects"] });
          }}
        >
          <TrashIcon />
        </Button>
        <EditButton data={data} />
      </div>
      <div className="image w-full h-[300px] relative">
        <Image
          src={data?.cover_image?.secure_url}
          fill
          className="object-cover"
          alt={data?.title}
        />
      </div>
      <div className="content px-4 py-3 flex flex-col flex-[1]">
        <div className="title flex items-center justify-between gap-4">
          <h1 className="font-bold text-3xl">{data?.title}</h1>
          <span className="text-gray-200">{timeAgo(data?.createdAt)}</span>
        </div>
        <p className="font-light mb-2">
          {data?.type} / {data?.location}
        </p>
        <p
          className="text-base text-gray-300 flex-[1]"
          dangerouslySetInnerHTML={{ __html: data?.description as string }}
        ></p>
        <p className="mt-1 text-base">{data?.credits}</p>
      </div>
    </div>
  );
};
