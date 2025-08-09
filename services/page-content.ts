import ApiClient from "@/lib/apiClient";
import { queryClient } from "@/providers/queryProvider";
import { BFIApiResponse, getPagesResponse } from "@/types/pages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPages = (params: {}) => {
  const endpoint = new ApiClient<any, getPagesResponse>("/pages");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: [params],
    meta: { params },
  });
};

export const useUpdatePageSection = ({ pageName }: { pageName: string }) => {
  const endpoint = new ApiClient<{ pageName: string; sections: {} }, any>(
    "/pages"
  );
  return useMutation({
    mutationFn: endpoint.put,
    mutationKey: [""],
    onSuccess: () => {
      toast.success("Page updated successfully.");
      queryClient.invalidateQueries({ queryKey: [{ name: pageName }] });
    },
  });
};
