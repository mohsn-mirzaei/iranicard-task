import { Wallet, AddWallet } from "@/entities/Wallet";
import APIClient from "@/services/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllWalletRequest = new APIClient<any, Wallet>(
  "/api/modules/crypto/v1/client/getAllWallets"
);

const addWalletRequest = new APIClient<AddWallet, any>(
  "/api/modules/crypto/v1/client/saveWallet"
);

const deleteWalletRequest = new APIClient<{ id: string }, any>(
  "/api/modules/crypto/v1/client/deleteWallet"
);

const getAllWallets = () => {
  return getAllWalletRequest
    .get({
      withCredentials: true,
    })
    .then((res) => res.data);
};

const addWallet = (data: AddWallet) => {
  return addWalletRequest
    .post(data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

const deleteWallet = (id: string) => {
  return deleteWalletRequest
    .delete(id, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

const useAllWallets = () =>
  useQuery({
    queryKey: ["all-wallets"],
    queryFn: getAllWallets,
  });

const mutateWallet = () =>
  useMutation({
    mutationFn: addWallet,
  });

const mutateDeleteWallet = () =>
  useMutation({
    mutationFn: deleteWallet,
  });

export { useAllWallets, mutateWallet, mutateDeleteWallet };
