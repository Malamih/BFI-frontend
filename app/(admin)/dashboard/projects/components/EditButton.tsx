"use client";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
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
import { useUpdateProject } from "@/services/projects";
import { Project } from "@/types/projects";
import { Label } from "@radix-ui/react-label";
import { PenIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const EditButton = ({ data }: { data: Project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, error, isPending }: any = useUpdateProject(data?._id);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit This Project</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
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
            defaultValue={data?.title}
            variant={error?.fieldErrors?.title ? "destructive" : "default"}
            type="text"
            className="mb-4"
          />
          <Label className="mb-2 inline-block">Description</Label>
          <Textarea
            placeholder="Project Description"
            className="min-h-[90px] max-h-[200px]"
            name="description"
            defaultValue={data?.description}
            variant={
              error?.fieldErrors?.description ? "destructive" : "default"
            }
          />
          <div className="flex gap-5 mt-4">
            <div className="grid gap-2 w-full">
              <Label>Type</Label>
              <Input
                placeholder="Project type"
                name="type"
                defaultValue={data?.type}
                variant={error?.fieldErrors?.type ? "destructive" : "default"}
              />
            </div>
            <div className="grid gap-2 w-full">
              <Label>Location</Label>
              <Input
                placeholder="Project location"
                name="location"
                defaultValue={data?.location}
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
            defaultValue={data?.credits}
            variant={error?.fieldErrors?.credits ? "destructive" : "default"}
          />
          <ImageInput
            id="create-project-image-input"
            name="cover_image"
            className="mt-4"
            defaultImage={data?.cover_image?.secure_url}
            variant={
              error?.fieldErrors?.cover_image ? "destructive" : "default"
            }
          />
          <Button
            className="w-full mt-4 sticky bottom-0 left-0"
            disabled={isPending}
          >
            {isPending ? "Editing..." : "Edit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
