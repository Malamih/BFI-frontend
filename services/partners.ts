import ApiClient from "@/lib/apiClient";
import { Partner, PartnersResponse } from "@/types/partners";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePartner = () => {
  const endpoint = new ApiClient<any, { message: string; payload: Partner }>(
    "/partners"
  );

  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["partners"],
  });
};

export const useGetPartners = ({ query }: { query: {} }) => {
  const endpoint = new ApiClient<any, PartnersResponse>("/partners");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["partners", query],
    meta: { params: { ...query } },
  });
};

export const useDeletePartner = (id: string) => {
  const endpoint = new ApiClient<any, any>("/partners");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
    mutationKey: ["partners"],
  });
};

export const useUpdatePartner = (id: string) => {
  const endpoint = new ApiClient<any, { message: string; payload: Partner }>(
    "/partners"
  );
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
  });
};
