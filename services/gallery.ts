import ApiClient from "@/lib/apiClient";
import { GetGallery } from "@/types/gallery";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetGallery = () => {
  const endpoint = new ApiClient<any, GetGallery>("/gallery");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["gallery"],
  });
};

export const useCreateImage = () => {
  const endpoint = new ApiClient<any, any>("/gallery");
  return useMutation({
    mutationFn: endpoint.post,
  });
};

export const useDeleteImage = (id: string) => {
  const endpoint = new ApiClient<any, any>("/gallery");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
  });
};
