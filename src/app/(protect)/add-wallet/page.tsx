"use client";
import AddWalletForm from "@/components/add-wallet-form";
import AlertDialogUnsaved from "@/components/alert-dialog-unsaved";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddWalletPage = () => {
  const router = useRouter();
  const [formDirty, setFormDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const handleGoBack = () => {
    if (formDirty) {
      setShowUnsavedDialog(true);
    } else {
      router.back();
    }
  };

  const confirmGoBack = () => {
    setShowUnsavedDialog(false);
    router.back();
  };

  const cancelGoBack = () => {
    setShowUnsavedDialog(false);
  };

  return (
    <main className="flex-1 min-h-screen container px-4 py-8">
      <Button variant="ghost" size="sm" onClick={handleGoBack} className="mb-6">
        <ArrowRight className="mr-2 h-4 w-4" />
        بازگشت به ولت‌ها
      </Button>

      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-xl border bg-card animate-fadeIn">
        <AddWalletForm
          onSuccess={() => router.push("/wallets")}
          onDirtyStateChange={setFormDirty}
        />
      </div>

      <AlertDialogUnsaved
        showUnsavedDialog={showUnsavedDialog}
        setShowUnsavedDialog={setShowUnsavedDialog}
        cancelAction={cancelGoBack}
        confirmAction={confirmGoBack}
      />
    </main>
  );
};

export default AddWalletPage;
