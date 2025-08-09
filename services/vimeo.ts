import vimeoApiClient from "@/lib/vimeoApiClient";
import { GetSingleVideoResponse } from "@/types/vimeo";
import { useQuery } from "@tanstack/react-query";

export const useFetchVideos = (
  id: string,
  fetchingType: "single" | "multiple",
  params?: {}
) => {
  let url =
    fetchingType == "multiple" ? `/users/${id}/videos` : `/videos/${id}`;
  const endpoint = new vimeoApiClient<any, any>(url);
  return useQuery({
    queryKey: ["vimeo", id, params],
    queryFn: endpoint.get,
    retry: false,
    meta: { params: { ...params } },
    enabled: false,
  });
};

export const useFetchVideo = ({
  id,
  uniqueId,
}: {
  id: string;
  uniqueId: string;
}) => {
  const endpoint = new vimeoApiClient<any, GetSingleVideoResponse>(
    `/videos/${id}`
  );
  return useQuery({
    queryFn: endpoint.get,
    queryKey: [uniqueId],
    retry: false,
    enabled: false,
  });
};

export const extractId = (url: string) => {
  return url.split("/").pop();
};
