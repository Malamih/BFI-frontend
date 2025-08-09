import ApiClient from "@/lib/apiClient";
import {
  CreateJuror,
  DeleteJuror,
  GetJurorsReponse,
  UpdateJuror,
} from "@/types/jurors";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetJurors = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, GetJurorsReponse>("/jurors");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["jurors", query],
    meta: { params: query },
  });
};

export const useCreateJuror = () => {
  const endpoint = new ApiClient<any, CreateJuror>("/jurors");
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["jurors"],
  });
};

export const useDeleteJuror = (id: string) => {
  const endpoint = new ApiClient<any, DeleteJuror>("/jurors");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
    mutationKey: ["jurors"],
  });
};

export const useUpdateJuror = (id: string) => {
  const endpoint = new ApiClient<any, UpdateJuror>("/jurors");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};
