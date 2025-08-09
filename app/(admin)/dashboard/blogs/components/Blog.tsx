import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/date";
import { BlogType } from "@/types/blogs";
import { Edit, Eye, Play, Trash2 } from "lucide-react";
import Image from "next/image";
import { EditBlog } from "./EditBlog";
import { useDeleteBlog } from "@/services/blogs";
import { queryClient } from "@/providers/queryProvider";

export const BLog = ({ data }: { data: BlogType }) => {
  const { mutateAsync, isPending } = useDeleteBlog(data?._id as string);

  const handleDelete = () => {
    mutateAsync()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      })
      .catch((err) => {});
  };
  return (
    <div className="bg-black flex flex-col border-gray-500/50 border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={data?.thumbnail?.secure_url}
          alt={data.title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-[1]">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {data?.category?.name}
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(data?.createdAt as string)}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {data.title}
        </h3>

        <div
          className="text-gray-300 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data?.body }}
        ></div>

        <div className="flex items-center justify-between flex-[1]">
          <div className="flex items-center gap-2">
            <img
              src={data?.writtenBy?.profilePicture?.secure_url}
              alt={data?.writtenBy?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-400">
              {data?.writtenBy?.name}
            </span>
          </div>

          <div className="flex gap-1">
            <EditBlog id={data?._id as string} />
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-red-600 hover:text-red-700"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
