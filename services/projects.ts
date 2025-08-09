import ApiClient from "@/lib/apiClient";
import {
  CreateProject,
  DeleteProject,
  GetProject,
  GetProjects,
  UpdateProject,
} from "@/types/projects";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProjects = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, GetProjects>("/projects");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["projects", query],
    meta: { params: query },
  });
};

export const useGetProject = (id: string) => {
  const endpoint = new ApiClient<any, GetProject>(`/projects/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["projects", id],
  });
};

export const useCreateProject = () => {
  const endpoint = new ApiClient<any, CreateProject>("/projects");
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["projects"],
  });
};

export const useUpdateProject = (id: string) => {
  const endpoint = new ApiClient<any, UpdateProject>("/projects");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};

export const useDeleteProject = (id: string) => {
  const endpoint = new ApiClient<any, DeleteProject>("/projects");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
    mutationKey: ["projects"],
  });
};
