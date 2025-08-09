import { useState, useEffect } from "react";
import { Edit, PlusIcon } from "lucide-react";

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

import { useGetBlog, useUpdateBlog } from "@/services/blogs";
import { useGetCategories } from "@/services/categories";
import { useGetWriters } from "@/services/writers";
import { queryClient } from "@/providers/queryProvider";

interface EditBlogProps {
  id: string; // معرّف المدونة المراد تعديلها
}

export const EditBlog = ({ id }: EditBlogProps) => {
  const [open, setOpen] = useState(false);

  // جلب بيانات المدونة
  const {
    data: blog,
    isLoading: isBlogLoading,
    error: blogError,
  } = useGetBlog(id);

  const { data: writers } = useGetWriters({ query: {} });
  const { data: categories } = useGetCategories({ query: {} });

  // الحالة للتحكم بالقيم
  const [blogBody, setBlogBody] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [selectedWriter, setSelectedWriter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // تحديث hook للتحرير
  const { error, mutateAsync, isPending }: any = useUpdateBlog(id);

  // تعيين القيم الافتراضية بعد تحميل بيانات المدونة
  useEffect(() => {
    if (blog?.payload) {
      setBlogBody(blog.payload?.body || "");
      setVideoLink(blog.payload.video || "");
      setSelectedWriter(blog?.payload?.writtenBy?._id || "");
      setSelectedCategory(blog?.payload?.category?._id || "");
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.set("body", blogBody);
    if (videoLink !== "") {
      formData.set("video", videoLink);
    } else {
      formData.delete("video");
    }

    formData.set("writtenBy", selectedWriter);
    formData.set("category", selectedCategory);

    try {
      await mutateAsync(formData);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    } catch (err) {}
  };

  if (isBlogLoading) return <p>Loading...</p>;
  if (blogError) return <p>Error loading blog data</p>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Blog</DialogTitle>
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
              defaultValue={blog?.payload?.title || ""}
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
            defaultValue={videoLink}
          />
          {error?.fieldErrors?.video && (
            <p className="text-red-500 text-sm">
              {error.fieldErrors.video.join(", ")}
            </p>
          )}

          {/* Thumbnail ImageInput */}
          <div className="grid gap-2">
            <Label>Thumbnail</Label>
            <ImageInput
              name="thumbnail"
              id="edit-blog-image-input"
              defaultImage={blog?.payload?.thumbnail?.secure_url || ""}
            />
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
            {isPending ? "Updating..." : "Update Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
