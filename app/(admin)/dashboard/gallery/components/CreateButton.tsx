"use client";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/providers/queryProvider";
import { useCreateImage } from "@/services/gallery";
import React, { useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending, error }: any = useCreateImage();

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["gallery"] });
      })
      .catch(() => {});
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Image</DialogTitle>
        <form onSubmit={create}>
          <ImageInput
            id="add-new-image-input"
            name="image"
            variant={
              error?.message == "Image is required" ? "destructive" : "default"
            }
          />
          <Button className="w-full mt-2" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
