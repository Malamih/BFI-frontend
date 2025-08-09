import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/date";
import { queryClient } from "@/providers/queryProvider";
import { useDeletePartner } from "@/services/partners";
import { Partner as PartnerType } from "@/types/partners";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { EditButton } from "./EditButton";

export const Partner = ({ data }: { data: PartnerType }) => {
  const { mutateAsync, isPending } = useDeletePartner(data?._id);

  const deletePartner = async () => {
    await mutateAsync().catch(() => {});
    await queryClient.invalidateQueries({ queryKey: ["partners"] });
  };
  return (
    <div className="partner relative flex flex-col border border-gray-400 text-white rounded-lg p-4">
      <div className="options absolute top-2 right-2">
        <div className="delete">
          <Button
            className="w-fit h-fit p-2"
            variant={"ghost"}
            onClick={deletePartner}
            disabled={isPending}
          >
            <TrashIcon />
          </Button>
        </div>
        <div className="edit">
          <EditButton partner={data} />
        </div>
      </div>
      <div className="logo bg-white flex-[1] p-4 w-fit rounded-sm flex items-center justify-center">
        {data?.logo && (
          <Image
            src={data?.logo?.secure_url}
            width={100}
            height={100}
            alt={data.name}
            className="max-h-20 object-contain"
          />
        )}
      </div>
      <div className="name mt-3">
        <h3 className="text-2xl font-semibold">{data?.name}</h3>
        <p className="font-normal text-sm">{timeAgo(data?.createdAt)}</p>
      </div>
    </div>
  );
};
