"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreateWriter } from "@/services/writers"; // تأكد من وجود هذا hook
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { queryClient } from "@/providers/queryProvider";

export const CreateWriter = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<any>(null);

  const { mutateAsync, isPending } = useCreateWriter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.target as HTMLFormElement);
    try {
      await mutateAsync(form, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["writers"] });
          setOpen(false);
        },
        onError: (err: any) => {
          setError(err);
        },
      });
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Writer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Writer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input placeholder="Type writer's name" name="name" />
            {error?.fieldErrors?.name && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.name.join(", ")}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Type writer's email"
              name="email"
            />
            {error?.fieldErrors?.email && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.email.join(", ")}
              </p>
            )}
          </div>

          {/* Profile Picture */}
          <div className="grid gap-2">
            <Label>Profile Picture</Label>
            <ImageInput id="profile-picture" name="profilePicture" />
            {error?.fieldErrors?.profilePicture && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.profilePicture.join(", ")}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Writer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
