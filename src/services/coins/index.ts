import Coin from "@/entities/Coin";
import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<any, Coin>(
  "/api/public/modules/crypto/v1/client/listProduct"
);

const getAllCoins = () => {
  return apiClient.get().then((res) => res.data);
};

const useAllCoins = () =>
  useQuery({
    queryKey: ["all-coins"],
    queryFn: getAllCoins,
  });

export default useAllCoins;
