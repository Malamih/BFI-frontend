import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/providers/queryProvider";
import { useDeleteProgram } from "@/services/programs";
import { Program } from "@/types/programs";
import { EyeIcon, PenIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProgramRow = ({ data }: { data: Program }) => {
  const { mutateAsync: deleteProgram, isPending } = useDeleteProgram(
    data?._id as string
  );

  const handleDelete = async () => {
    deleteProgram()
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["programs"],
        });
      })
      .catch((err) => {});
  };
  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-2">
          <Image
            src={data?.background?.secure_url}
            width={400}
            height={400}
            alt={data?.name}
            className="object-cover w-[40px] h-[40px] rounded-sm"
          />
          <div className="content">
            <h2 className="font-medium">{data?.name}</h2>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">{data?.jury?.length}</TableCell>
      <TableCell className="text-center">{data?.partners?.length}</TableCell>
      <TableCell className="text-center">{data?.projects?.length}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Link href={`/dashboard/programs/${data?._id}`}>
            <Button variant={"ghost"}>
              <EyeIcon />
            </Button>
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Button variant={"ghost"} onClick={handleDelete} disabled={isPending}>
            <TrashIcon />
          </Button>
          <Link href={`/dashboard/programs/edit/${data?._id}`}>
            <Button variant={"ghost"}>
              <PenIcon />
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};
