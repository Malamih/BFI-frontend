import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { timeAgo } from "@/lib/date";
import { queryClient } from "@/providers/queryProvider";
import { useDeleteJuror } from "@/services/jurors";
import { Program } from "@/types/programs";
import { PenIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { EditButton } from "./EditButton";

export interface Juror {
  name: string;
  company: string;
  image: {
    public_id: string;
    secure_url: string;
  };
  _id: string;
  programs: Program[];
  createdAt: string;
  updatedAt: string;
}

export const Juror = ({ data }: { data: Juror }) => {
  const { mutateAsync: deleteJuror, isPending: deleting } = useDeleteJuror(
    data?._id
  );

  const handleDeleteJuror = async () => {
    await deleteJuror()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["jurors"] });
      })
      .catch(() => {});
  };
  return (
    <TableRow>
      <TableCell>
        <Image
          width={4000}
          height={4000}
          alt={data.name}
          src={data?.image?.secure_url}
          className="w-[60px] h-[60px] object-cover rounded-sm"
        />
      </TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.company}</TableCell>
      <TableCell>{timeAgo(data.createdAt)}</TableCell>
      <TableCell>{timeAgo(data.updatedAt)}</TableCell>
      <TableCell>
        <div className="flex gap-2 justify-center">
          <Button
            variant={"ghost"}
            disabled={deleting}
            onClick={handleDeleteJuror}
          >
            <TrashIcon />
          </Button>
          <EditButton data={data} />
        </div>
      </TableCell>
    </TableRow>
  );
};
