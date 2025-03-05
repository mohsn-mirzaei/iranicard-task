import Customer from "@/entities/Customer";
import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<any, Customer>(
  "/api/v1/users",
  process.env.NEXT_PUBLIC_CUSTOMERS_URL
);

const getCustomers = () => {
  return apiClient.get().then((res) => res.data);
};

const useCustomers = () =>
  useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

export default useCustomers;
