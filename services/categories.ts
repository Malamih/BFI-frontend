import ApiClient from "@/lib/apiClient";
import {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetCategoryResponse,
  GetCategoriesResponse,
  UpdateCategoryResponse,
} from "@/types/blogs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, GetCategoriesResponse>("/categories");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["categories", query],
    meta: { params: query },
  });
};

export const useGetCategory = (id: string) => {
  const endpoint = new ApiClient<any, GetCategoryResponse>(`/categories/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["single-category", id],
  });
};

export const useCreateCategory = () => {
  const endpoint = new ApiClient<any, CreateCategoryResponse>("/categories");

  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["create-category"],
  });
};

export const useUpdateCategory = (id: string) => {
  const endpoint = new ApiClient<any, UpdateCategoryResponse>("/categories");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};

export const useDeleteCategory = (id: string) => {
  const endpoint = new ApiClient<any, DeleteCategoryResponse>("/categories");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
  });
};
