type Coin = {
  _id: string;
  symbol: string;
  slug: string;
  fa_name: string;
  logo: string;
  sell_to_iranicard_network_list: {
    addressRegex: string;
  }[];
};

export default Coin;
