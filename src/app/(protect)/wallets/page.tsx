"use client";
import AddWalletForm from "@/components/add-wallet-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import WalletDetails from "@/components/wallet-details";
import WalletList from "@/components/wallet-list";
import { Wallet } from "@/entities/Wallet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAllWallets } from "@/services/wallets";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WalletsPage = () => {
  const { data: wallets, isLoading } = useAllWallets();

  const router = useRouter();
  const isMobile = useIsMobile();

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Handle wallet selection
  const handleSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  // Handle create wallet button
  const handleCreateWallet = () => {
    if (isMobile) {
      router.push("/add-wallet");
    } else {
      setIsCreateModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">ولت های شما</h1>
          <Button onClick={handleCreateWallet} className="rounded-full h-10">
            ساخت ولت
            <Plus className="ms-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet List */}
          <div className="lg:col-span-1">
            <WalletList
              wallets={wallets}
              isLoading={isLoading}
              onSelect={handleSelectWallet}
            />
          </div>

          {/* Wallet Details */}
          <div className="lg:col-span-2">
            {selectedWallet ? (
              <WalletDetails
                wallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8 border rounded-xl bg-muted/30 text-center">
                <div>
                  <h3 className="text-xl font-medium mb-2">انتخاب ولت</h3>
                  <p className="text-muted-foreground mb-6">
                    یک ولت برای از لیست ولت های خود برای نمایش جزئیات انتخاب
                    کنید.
                  </p>
                  {wallets?.length === 0 && !isLoading && (
                    <Button
                      onClick={handleCreateWallet}
                      className="rounded-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      اولین ولت خود را بسازید
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Wallet Modal (desktop only) */}
        <AlertDialog
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        >
          <AlertDialogHeader>
            <AlertDialogTitle></AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent className="sm:max-w-[600px]">
            <AddWalletForm onSuccess={() => setIsCreateModalOpen(false)} />
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default WalletsPage;
