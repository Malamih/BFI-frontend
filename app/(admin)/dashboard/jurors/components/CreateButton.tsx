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
import { useCreateJuror } from "@/services/jurors";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createJuror, error, isPending }: any = useCreateJuror();
  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    await createJuror(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["jurors"] });
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
          <DialogTitle>Create A New Juror</DialogTitle>
          <DialogDescription>
            This juror will be visible at the "Create Program" page when you
            want to create a program
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={create}>
          <Label className="mb-2">Name</Label>
          <Input
            type="text"
            placeholder="Juror name"
            className="mb-4"
            name="name"
            variant={error?.fieldErrors?.name ? "destructive" : "default"}
          />
          <Label className="mb-2">Company</Label>
          <Input
            type="text"
            placeholder="Juror company"
            name="company"
            variant={error?.fieldErrors?.name ? "destructive" : "default"}
          />
          <ImageInput
            id="create-juror-image-input"
            name="image"
            className="mt-4"
          />
          <Button className="w-full mt-4" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
