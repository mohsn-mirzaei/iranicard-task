import { Button } from "@/components/ui/button";
import { Wallet } from "@/entities/Wallet";
import { cn } from "@/lib/utils";
import { mutateDeleteWallet } from "@/services/wallets";
import { handleCopy } from "@/utils/walletUtils";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, ExternalLink, Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface WalletDetailsProps {
  wallet: Wallet;
  setSelectedWallet: Dispatch<SetStateAction<Wallet | null>>;
  className?: string;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({
  wallet,
  setSelectedWallet,
  className,
}) => {
  const { mutate: deleteWallet, isPending } = mutateDeleteWallet();
  const queryClinet = useQueryClient();

  const handleViewExplorer = () => {
    // This is a placeholder URL - in a real app, you'd use the correct explorer for each network
    let explorerUrl = "https://etherscan.io/address/";
    if (wallet.network === "Polygon") {
      explorerUrl = "https://polygonscan.com/address/";
    }
    window.open(explorerUrl + wallet.address, "_blank");
  };

  return (
    <div className={cn("p-6 rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">{wallet.title}</h2>
        <Button
          variant={"destructive"}
          onClick={() =>
            deleteWallet(wallet._id, {
              onSuccess: () => {
                queryClinet.invalidateQueries({ queryKey: ["all-wallets"] });
                setSelectedWallet(null);
              },
            })
          }
          disabled={isPending}
        >
          حذف
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
          {wallet.network}
        </span>
        <span className="text-xs text-muted-foreground">
          ساخته شده در {new Date(wallet.created_at).toLocaleDateString("fa-IR")}
        </span>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/60">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">آدرس</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={(e) => handleCopy(e, wallet.address)}
              >
                <Copy className="mr-1 h-3.5 w-3.5" />
                کپی
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={handleViewExplorer}
              >
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                نمایش
              </Button>
            </div>
          </div>
          <p className="font-mono text-sm break-all">{wallet.address}</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/30 border border-border/60">
          <span className="text-sm text-muted-foreground block mb-1">نماد</span>
          <p className="text-2xl font-semibold text-end">{wallet.symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
