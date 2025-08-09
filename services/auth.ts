import ApiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useLogin = (scss: (token: string) => void) => {
  const req = new ApiClient<any, LoginResponse>("/admin/login");
  return useMutation({
    mutationFn: req.post,
    mutationKey: ["auth"],
    onSuccess: (data) => {
      scss(data.token);
    },
  });
};

export const useCheckAuth = (scss: () => void) => {
  const req = new ApiClient<any, CheckAuthResponse>("/admin/checkAuth");
  return useMutation({
    mutationFn: req.post,
    mutationKey: ["auth"],
    onSuccess: (data) => {
      scss();
    },
  });
};
