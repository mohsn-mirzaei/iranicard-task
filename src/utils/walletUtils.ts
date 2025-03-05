import React from "react";
import { toast } from "sonner";

/**
 * Copies text to clipboard
 * @param text Text to copy
 * @returns Promise that resolves when text is copied
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};

export const handleCopy = async (e: React.MouseEvent, address: string) => {
  e.stopPropagation();
  const success = await copyToClipboard(address);
  if (success) {
    toast.success("آدرس کپی شد.");
  } else {
    toast.error("خطا در کپی کردن آدرس!");
  }
};

/**
 * Truncates address for display
 * @param address The full address
 * @param startChars Number of characters to show at the start
 * @param endChars Number of characters to show at the end
 * @returns Truncated address
 */
export const truncateAddress = (
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string => {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Generates a random wallet address (for demo purposes)
 * @returns A random hex string that looks like an address
 */
export const generateRandomAddress = (): string => {
  return (
    "0x" +
    Array(40)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")
  );
};

/**
 * Validates if a string looks like a wallet address
 * @param address Address to validate
 * @returns Boolean indicating if the address is valid
 */
export const isValidAddress = (address: string): boolean => {
  // This is a simplified validation for demo
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Hook to detect if user tries to navigate away with unsaved changes
 * @param isDirty Whether form has unsaved changes
 * @returns Function to remove the warning
 */
export const useUnsavedChangesWarning = (isDirty: boolean): (() => void) => {
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    if (isDirty) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return () => {
    window.removeEventListener("beforeunload", () => {});
  };
};
