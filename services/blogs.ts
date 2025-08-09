import ApiClient from "@/lib/apiClient";
import {
  CreateBlogResponse,
  DeleteBlogResponse,
  GetBlogResponse,
  GetBlogsResponse,
  UpdateBlogResponse,
} from "@/types/blogs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetBlogs = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, GetBlogsResponse>("/blogs");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["blogs", query],
    meta: { params: query },
  });
};

export const useGetBlog = (id: string) => {
  const endpoint = new ApiClient<any, GetBlogResponse>(`/blogs/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["single-blog", id],
  });
};

export const useCreateBlog = () => {
  const endpoint = new ApiClient<any, CreateBlogResponse>("/blogs");

  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["create-blog"],
  });
};

export const useUpdateBlog = (id: string) => {
  const endpoint = new ApiClient<any, UpdateBlogResponse>("/blogs");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};

export const useDeleteBlog = (id: string) => {
  const endpoint = new ApiClient<any, DeleteBlogResponse>("/blogs");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
  });
};
