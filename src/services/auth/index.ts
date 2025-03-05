import { LoginFormSchema } from "@/schemas";
import APIClient from "@/services/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

type User = {
  full_name: string;
};

const apiClient = new APIClient<LoginFormSchema, User>("/api/v1/login");
const authStatusRequest = new APIClient<any, any>(
  "/api/v1/authentication-status"
);

const login = (data: LoginFormSchema) => {
  return apiClient
    .post(data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

const mutateLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useAuthStatus = () =>
  useQuery({
    queryKey: ["auth-status"],
    queryFn: () =>
      authStatusRequest.get({ withCredentials: true }).then((res) => res),
  });
export default mutateLogin;
