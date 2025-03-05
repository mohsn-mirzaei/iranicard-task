import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import useAllCoins from "@/services/coins";
import { mutateWallet } from "@/services/wallets";
import {
  generateRandomAddress,
  useUnsavedChangesWarning,
} from "@/utils/walletUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AlertDialogUnsaved from "./alert-dialog-unsaved";
import VirtualizedCoinList from "./virtualized-coin-list";

interface AddWalletFormProps {
  onSuccess?: () => void;
  onDirtyStateChange?: (isDirty: boolean) => void;
  className?: string;
}

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "نام ولت اجباری است.").max(50, "نام ولت طولانی است."),
  network: z.string().min(1, "انتخاب شبکه اجباری است."),
  coin: z.string().min(1, "انتخاب ارز اجباری است."),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddWalletForm: React.FC<AddWalletFormProps> = ({
  onSuccess,
  onDirtyStateChange,
  className,
}) => {
  const router = useRouter();
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const allCoins = useAllCoins();
  const { mutate: addWallet, isPending } = mutateWallet();
  const queryClinet = useQueryClient();

  // Define available networks
  const networks = [
    { value: "Ethereum", label: "Ethereum" },
    { value: "Polygon", label: "Polygon" },
    { value: "Arbitrum", label: "Arbitrum" },
    { value: "Optimism", label: "Optimism" },
    { value: "Avalanche", label: "Avalanche" },
  ];

  // Set up form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      network: "",
      coin: "",
      address: "",
    },
  });

  // Connect the form state to the unsaved changes warning
  const isDirty = form.formState.isDirty;
  useUnsavedChangesWarning(isDirty);

  // Notify parent component about dirty state changes
  useEffect(() => {
    if (onDirtyStateChange) {
      onDirtyStateChange(isDirty);
    }
  }, [isDirty, onDirtyStateChange]);

  const onSubmit = async (values: FormValues) => {
    try {
      const address = values.address || generateRandomAddress();

      addWallet(
        {
          address,
          title: values.name,
          network: values.network,
          symbol: values.coin,
        },
        {
          onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ["all-wallets"] });
            if (onSuccess) {
              onSuccess();
            } else {
              router.push("/wallets");
            }
          },
        }
      );
    } catch (error) {
      toast.error("Failed to create wallet. Please try again.");
      console.error("Error creating wallet:", error);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
      setPendingAction(() => () => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/wallets");
        }
      });
    } else {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/wallets");
      }
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction();
    }
    setShowUnsavedDialog(false);
    setPendingAction(null);
  };

  const cancelAction = () => {
    setShowUnsavedDialog(false);
    setPendingAction(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">ساخت ولت جدید</h2>
        <p className="text-muted-foreground mt-2">
          یک کیف پول جدید به حساب خود اضافه کنید. شما می توانید یک جدید ایجاد
          کنید آدرس موجود یا وارد کنید.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام ولت</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My Wallet"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شبکه</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full" dir="rtl">
                      <SelectValue placeholder="انتخاب شبکه" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {networks.map((network) => (
                      <SelectItem key={network.value} value={network.value}>
                        {network.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ارز</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full" dir="rtl">
                      <SelectValue placeholder="انتخاب ارز" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="max-h-[300px]" dir="rtl">
                    <VirtualizedCoinList
                      coins={allCoins.data || []}
                      isLoading={allCoins.isLoading}
                    />
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>آدرس ولت (اختیاری)</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} disabled={isPending} />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  برای ایجاد یک آدرس جدید خالی بگذارید
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              لغو
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ساخت ولت
            </Button>
          </div>
        </form>
      </Form>

      {/* AlertDialog for unsaved changes confirmation */}
      <AlertDialogUnsaved
        showUnsavedDialog={showUnsavedDialog}
        setShowUnsavedDialog={setShowUnsavedDialog}
        cancelAction={cancelAction}
        confirmAction={confirmAction}
      />
    </div>
  );
};

export default AddWalletForm;
