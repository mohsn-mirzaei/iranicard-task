import { Button } from "@/components/ui/button";
import { Wallet } from "@/entities/Wallet";
import { cn } from "@/lib/utils";
import { handleCopy, truncateAddress } from "@/utils/walletUtils";
import { CopyIcon, ExternalLink } from "lucide-react";
import React from "react";

interface WalletListProps {
  wallets?: Wallet[];
  isLoading?: boolean;
  onSelect: (wallet: Wallet) => void;
  className?: string;
}

const WalletList: React.FC<WalletListProps> = ({
  wallets,
  isLoading = false,
  onSelect,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={cn("space-y-3", className)}>
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="rounded-lg border p-4 animate-pulse bg-muted/30"
          >
            <div className="h-6 bg-muted rounded-md w-1/3 mb-3"></div>
            <div className="h-4 bg-muted rounded-md w-2/3 mb-2"></div>
            <div className="h-4 bg-muted rounded-md w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (wallets?.length === 0) {
    return (
      <div className={cn("text-center py-10", className)}>
        <h3 className="text-lg font-medium mb-2">ولتی وجود ندارد!</h3>
        <p className="text-muted-foreground mb-6">
          برای شروع اولین ولت خود را بسازید.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {wallets?.map((wallet) => (
        <div
          key={wallet._id}
          onClick={() => onSelect(wallet)}
          className={cn(
            "rounded-lg border border-border/60 p-4 cursor-pointer transition-all duration-200",
            "hover:border-border hover:shadow-sm bg-card/30 hover:bg-card"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{wallet.title}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              {wallet.network}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <p className="text-muted-foreground text-sm font-mono">
              {truncateAddress(wallet.address, 8, 6)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={(e) => handleCopy(e, wallet.address)}
            >
              <CopyIcon className="h-3.5 w-3.5" />
              <span className="sr-only">Copy address</span>
            </Button>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
            <p className="font-medium">{wallet.symbol}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary h-8 px-2 hover:bg-primary/5"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  `https://etherscan.io/address/${wallet.address}`,
                  "_blank"
                );
              }}
            >
              مشاهده <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletList;
