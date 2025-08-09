import ApiClient from "@/lib/apiClient";
import {
  CreateProgramResponse,
  GetProgramResponse,
  ProgramsResponse,
  UpdateProgramResponse,
} from "@/types/programs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPrograms = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, ProgramsResponse>("/programs");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["programs", query],
    meta: { params: query },
  });
};

export const useGetProgram = (id: string) => {
  const endpoint = new ApiClient<any, GetProgramResponse>(`/programs/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["single-program", id],
  });
};

export const useCreateProgram = () => {
  const endpoint = new ApiClient<any, CreateProgramResponse>("/programs");

  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["create-programs"],
  });
};

export const useUpdateProgram = (id: string) => {
  const endpoint = new ApiClient<any, UpdateProgramResponse>("/programs");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};

export const useDeleteProgram = (id: string) => {
  const endpoint = new ApiClient<any, UpdateProgramResponse>("/programs");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
  });
};
