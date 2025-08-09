"use client";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/providers/queryProvider";
import { useCreateProject } from "@/services/projects";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const { mutateAsync, error, isPending }: any = useCreateProject();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area !h-auto">
        <DialogHeader>
          <DialogTitle>Create A New Project</DialogTitle>
          <DialogDescription>
            This project will be available at "Create Program" page in your
            dashboard.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            form.append("description", description);
            await mutateAsync(form).then(() => {
              queryClient.invalidateQueries({ queryKey: ["projects"] });
              setIsOpen(false);
            });
          }}
        >
          <Label className="mb-2 inline-block">Title</Label>
          <Input
            placeholder="Project title"
            name="title"
            variant={error?.fieldErrors?.title ? "destructive" : "default"}
            type="text"
            className="mb-4"
          />
          <Label className="mb-2 inline-block">Description</Label>
          <RichEditor
            value={description}
            onChange={setDescription}
            placeholder="Project Description"
            className={clsx({
              "border-red-500": error?.fieldErrors?.description,
            })}
          />
          <div className="flex gap-5 mt-4">
            <div className="grid gap-2 w-full">
              <Label>Type</Label>
              <Input
                placeholder="Project type"
                name="type"
                variant={error?.fieldErrors?.type ? "destructive" : "default"}
              />
            </div>
            <div className="grid gap-2 w-full">
              <Label>Location</Label>
              <Input
                placeholder="Project location"
                name="location"
                variant={
                  error?.fieldErrors?.location ? "destructive" : "default"
                }
              />
            </div>
          </div>
          <Label className="mt-4 mb-2 inline-block">Credits</Label>
          <Input
            placeholder="Project credits, e.g produced by..."
            name="credits"
            variant={error?.fieldErrors?.credits ? "destructive" : "default"}
          />
          <ImageInput
            id="create-project-image-input"
            name="cover_image"
            className="mt-4"
            variant={
              error?.fieldErrors?.cover_image ? "destructive" : "default"
            }
          />
          <Button
            className="w-full mt-4 sticky bottom-0 left-0"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
