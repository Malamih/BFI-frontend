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
import { queryClient } from "@/providers/queryProvider";
import { useCreatePartner } from "@/services/partners";
import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending, error }: any = useCreatePartner();

  const createPartner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    await mutateAsync(data)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["partners"] });
      })
      .catch(() => {});
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Partner</DialogTitle>
          <DialogDescription>
            These partners will be visible at the Home page and About page.
          </DialogDescription>
          <form onSubmit={createPartner}>
            <Label className="mb-2 inline-block">Name</Label>
            <Input
              placeholder="Enter partner name"
              type="text"
              className="mb-4"
              name="name"
              variant={error?.fieldErrors?.name && "destructive"}
            />
            <span className="text-red-500 text-sm capitalize">
              {error?.fieldErrors?.name}
            </span>
            <Label className="mb-2 block">Partner Logo</Label>
            <ImageInput
              id="partners-image-input"
              name="logo"
              className="bg-white"
              variant={
                error?.message == "Logo is required" ? "destructive" : "default"
              }
            />
            <Button className="w-full mt-4" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
