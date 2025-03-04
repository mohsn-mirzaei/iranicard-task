import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

type MegaMenus = {
  id: number;
  menuName: string;
  symbol: {
    id: number;
    symbol: string;
  }[];
};

const apiClient = new APIClient<MegaMenus>(
  "/api/mega-menus?populate=*",
  process.env.NEXT_PUBLIC_PANEL_URL
);

const getMegaMenus = () => {
  return apiClient.get().then((res) => res.data);
};

const useMegaMenu = () =>
  useQuery({
    queryKey: ["mega-menus"],
    queryFn: getMegaMenus,
  });

export default useMegaMenu;
