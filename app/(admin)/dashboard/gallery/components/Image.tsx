import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/queryProvider";
import { useDeleteImage } from "@/services/gallery";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

export type GalleryImageType = {
  _id: string;
  image: {
    public_id: string;
    secure_url: string;
  };
};

export const GalleryImage = ({ image }: { image: GalleryImageType }) => {
  const { mutateAsync, isPending } = useDeleteImage(image._id);
  const deleteImage = async () => {
    await mutateAsync()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["gallery"] });
      })
      .catch(() => {});
  };
  return (
    <li
      key={image._id}
      className="break-inside-avoid relative mb-4 rounded-lg overflow-hidden border"
    >
      <div className="absolute top-2 right-2">
        <Button
          size={"sm"}
          className="bg-red-700 hover:bg-red-500 focus-visible:ring-red-500/50"
          disabled={isPending}
          onClick={deleteImage}
        >
          <TrashIcon />
        </Button>
      </div>
      {image?.image && (
        <Image
          src={image?.image?.secure_url}
          alt="gallery image"
          width={500}
          height={300}
          className="w-full h-auto object-cover"
        />
      )}
    </li>
  );
};
