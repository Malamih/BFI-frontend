import { extractPublicId } from "@/helpers";
import ApiClient from "@/lib/apiClient";
import {
  CloudinaryImageDeleteResponse,
  CloudinaryImageUploadResponse,
} from "@/types/cloudinary";
import { useMutation } from "@tanstack/react-query";

export const useUploadToCloudinary = () => {
  const endpoint = new ApiClient<any, CloudinaryImageUploadResponse>(
    "/cloudinary/upload"
  );
  return useMutation({
    mutationFn: endpoint.post,
  });
};

export const useDeleteFromCloudinary = (
  scss: (res: CloudinaryImageDeleteResponse) => void
) => {
  return useMutation({
    mutationFn: (data: { public_id: string }) =>
      new ApiClient<any, CloudinaryImageDeleteResponse>(
        `/cloudinary?id=${data?.public_id}`
      ).delete(),
    onSuccess: (res) => {
      scss(res);
    },
  });
};

export const useReplaceImage = () => {
  const uploadMutation = useUploadToCloudinary();
  const deleteMutation = useDeleteFromCloudinary(() => {});

  const replaceImage = async (oldImage: string, newImage: FormData) => {
    const public_id = extractPublicId(oldImage);
    public_id && (await deleteMutation.mutateAsync({ public_id }));
    return uploadMutation.mutateAsync(newImage);
  };

  return {
    replaceImage,
    isReplacing: uploadMutation.isPending || deleteMutation.isPending,
  };
};
