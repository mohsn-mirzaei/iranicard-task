import { LoginFormSchema } from "@/schemas";
import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

type User = {
  full_name: string;
};

const apiClient = new APIClient<LoginFormSchema, User>("/api/v1/login");

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

export default mutateLogin;
