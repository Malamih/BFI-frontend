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
import { useCreateCategory } from "@/services/categories";
import { useQueryClient } from "@tanstack/react-query";

export const CreateCategory = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<any>(null);

  const { mutateAsync, isPending } = useCreateCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await mutateAsync(
        { name, slug },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            setOpen(false);
            setName("");
            setSlug("");
          },
          onError: (err: any) => {
            setError(err);
          },
        }
      );
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              placeholder="Type your category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error?.fieldErrors?.name && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.name.join(", ")}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              placeholder="Type your category slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            {error?.fieldErrors?.slug && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.slug.join(", ")}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
