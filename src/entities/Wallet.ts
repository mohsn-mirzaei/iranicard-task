type Wallet = {
  _id: string;
  address: string;
  network: string;
  symbol: string;
  title: string;
  created_at: string;
  user_id: string;
};

type AddWallet = {
  address: string;
  network: string;
  symbol: string;
  title: string;
};

export type { Wallet, AddWallet };
