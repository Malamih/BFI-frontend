import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { VideoFetcher } from "@/components/ui/dashboard/VideoFetcher";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateBlog } from "@/services/blogs";
import { useGetCategories } from "@/services/categories";
import { useGetWriters } from "@/services/writers";
import { queryClient } from "@/providers/queryProvider";

export const CreateBlog = () => {
  const [open, setOpen] = useState(false);
  const { data: writers } = useGetWriters({ query: {} });
  const { data: categories } = useGetCategories({ query: {} });

  const [blogBody, setBlogBody] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // إدارة حالة القيم المختارة في Selects
  const [selectedWriter, setSelectedWriter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { error, mutateAsync, isPending }: any = useCreateBlog();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.set("body", blogBody);
    if (videoLink != "") {
      formData.set("video", videoLink);
    }

    // نضيف قيم الـ Selects من الحالة (state)
    formData.set("writtenBy", selectedWriter);
    formData.set("category", selectedCategory);

    try {
      await mutateAsync(formData);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    } catch (err) {
      // الخطأ يعرضه hook useCreateBlog في error
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Add A New Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              placeholder="Type a title for the blog"
              type="text"
              name="title"
              id="title"
            />
            {error?.fieldErrors?.title && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.title.join(", ")}
              </p>
            )}
          </div>

          {/* Body */}
          <div className="grid gap-2">
            <Label>Body</Label>
            <RichEditor onChange={setBlogBody} value={blogBody} />
            {error?.fieldErrors?.body && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.body.join(", ")}
              </p>
            )}
          </div>

          {/* Writer Selector */}
          <div className="grid gap-2">
            <Label htmlFor="writer">Written By</Label>
            <Select value={selectedWriter} onValueChange={setSelectedWriter}>
              <SelectTrigger id="writer" className="w-full">
                <SelectValue placeholder="Select a writer" />
              </SelectTrigger>
              <SelectContent>
                {writers?.payload?.map((w) => (
                  <SelectItem key={w._id} value={w._id}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error?.fieldErrors?.writer && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.writer.join(", ")}
              </p>
            )}
          </div>

          {/* Category Selector */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.payload?.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error?.fieldErrors?.category && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.category.join(", ")}
              </p>
            )}
          </div>

          {/* VideoFetcher */}
          <VideoFetcher
            buttonContent="Get It"
            imageInputId=""
            imageInputName=""
            thumbnail={false}
            label="Video (optional)"
            setVideoLink={setVideoLink}
          />
          {error?.fieldErrors?.video && (
            <p className="text-red-500 text-sm">
              {error.fieldErrors.video.join(", ")}
            </p>
          )}

          {/* Thumbnail ImageInput */}
          <div className="grid gap-2">
            <Label>Thumbnail</Label>
            <ImageInput name="thumbnail" id="create-blog-image-input" />
            {error?.fieldErrors?.thumbnail && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.thumbnail.join(", ")}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="sticky bottom-0 left-0"
          >
            {isPending ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
