import ApiClient from "@/lib/apiClient";
import {
  CreateWriterResponse,
  DeleteWriterResponse,
  GetWriterResponse,
  GetWritersResposne,
  UpdateWriterResponse,
} from "@/types/blogs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetWriters = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, GetWritersResposne>("/writers");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["writers", query],
    meta: { params: query },
  });
};

export const useGetWriter = (id: string) => {
  const endpoint = new ApiClient<any, GetWriterResponse>(`/writers/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["single-writer", id],
  });
};

export const useCreateWriter = () => {
  const endpoint = new ApiClient<any, CreateWriterResponse>("/writers");
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["create-writer"],
  });
};

export const useUpdateWriter = (id: string) => {
  const endpoint = new ApiClient<any, UpdateWriterResponse>("/writers");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};

export const useDeleteWriter = (id: string) => {
  const endpoint = new ApiClient<any, DeleteWriterResponse>("/writers");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
  });
};
