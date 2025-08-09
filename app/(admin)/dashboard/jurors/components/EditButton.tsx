import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/providers/queryProvider";
import { useCreateJuror, useUpdateJuror } from "@/services/jurors";
import { PenIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Juror } from "./Juror";

export const EditButton = ({ data }: { data: Juror }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    mutateAsync: updateJuror,
    error,
    isPending,
  }: any = useUpdateJuror(data?._id);

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    await updateJuror(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["jurors"] });
      })
      .catch(() => {});
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Juror</DialogTitle>
        </DialogHeader>
        <form onSubmit={update}>
          <Label className="mb-2">Name</Label>
          <Input
            type="text"
            placeholder="Juror name"
            className="mb-4"
            name="name"
            variant={error?.fieldErrors?.name ? "destructive" : "default"}
            defaultValue={data?.name}
          />
          <Label className="mb-2">Company</Label>
          <Input
            type="text"
            placeholder="Juror company"
            name="company"
            defaultValue={data?.company}
            variant={error?.fieldErrors?.name ? "destructive" : "default"}
          />
          <ImageInput
            id="edit-juror-image-input"
            name="image"
            className="mt-4"
            defaultImage={data?.image?.secure_url}
          />
          <Button className="w-full mt-4" disabled={isPending}>
            {isPending ? "Editing..." : "Edit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
