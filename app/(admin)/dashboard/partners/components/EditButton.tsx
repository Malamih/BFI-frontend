import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/providers/queryProvider";
import { useUpdatePartner } from "@/services/partners";
import { Partner } from "@/types/partners";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PenIcon } from "lucide-react";
import React, { useState } from "react";

export const EditButton = ({ partner }: { partner: Partner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending, error }: any = useUpdatePartner(partner?._id);

  const editPartner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name");
    if (name == partner.name) {
      form.delete("name");
    }
    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["partners"] });
      })
      .catch(() => {});
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Partner</DialogTitle>
          <form onSubmit={editPartner}>
            <Label className="mb-2 inline-block">Name</Label>
            <Input
              placeholder="Enter partner name"
              type="text"
              className="mb-4"
              name="name"
              defaultValue={partner?.name}
              variant={error?.fieldErrors?.name && "destructive"}
            />
            <span className="text-red-500 text-sm capitalize">
              {error?.fieldErrors?.name}
            </span>
            <Label className="mb-2 block">Partner Logo</Label>
            <ImageInput
              id="partners-image-input"
              name="logo"
              defaultImage={partner?.logo?.secure_url}
              className="bg-white"
              variant={
                error?.message == "Logo is required" ? "destructive" : "default"
              }
            />
            <Button className="w-full mt-4" disabled={isPending}>
              {isPending ? "Editing..." : "Edit"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
