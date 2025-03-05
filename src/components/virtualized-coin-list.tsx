import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectItem } from "@/components/ui/select";
import Coin from "@/entities/Coin";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

interface VirtualizedCoinListProps {
  coins: Coin[];
  isLoading: boolean;
}

const VirtualizedCoinList: React.FC<VirtualizedCoinListProps> = ({
  coins,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>(coins);
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (coins) {
      setFilteredCoins(
        coins.filter((coin) => {
          const coinName = (coin.fa_name || coin.slug || "").toLowerCase();
          const coinSlug = (coin.slug || "").toLowerCase();
          const coinSymbol = (coin.symbol || "").toLowerCase();
          const search = searchTerm.toLowerCase();

          return (
            coinName.includes(search) ||
            coinSlug.includes(search) ||
            coinSymbol.includes(search)
          );
        })
      );
    }
  }, [searchTerm, coins]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Reset scroll position when searching
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  };

  // If loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const coin = filteredCoins[index];
    if (!coin) return null;

    return (
      <div style={style}>
        <SelectItem
          key={coin.slug}
          value={coin.symbol}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {coin.logo && (
              <Image
                src={coin.logo}
                alt={coin.slug}
                width={50}
                height={50}
                className="h-4 w-4 object-contain"
              />
            )}
            <span>{coin.fa_name || coin.slug}</span>
            {coin.symbol && (
              <span className="text-xs text-muted-foreground">
                ({coin.symbol})
              </span>
            )}
          </div>
        </SelectItem>
      </div>
    );
  };

  return (
    <div className="w-full py-2">
      <div className="flex items-center border rounded-md px-3 mb-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی ارز..."
          value={searchTerm}
          onChange={handleSearch}
          className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {filteredCoins.length === 0 ? (
        <div className="flex justify-center py-4 text-muted-foreground">
          ارزی یافت نشد
        </div>
      ) : (
        <ScrollArea
          className={cn("h-[200px]", filteredCoins.length > 10 && "h-[200px]")}
        >
          <List
            ref={listRef}
            height={200}
            width="100%"
            itemCount={filteredCoins.length}
            itemSize={36}
            className="w-full"
            direction="rtl"
          >
            {Row}
          </List>
        </ScrollArea>
      )}
    </div>
  );
};

export default VirtualizedCoinList;
