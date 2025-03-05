"use client";

import { useAuthStatus } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isSuccess, isLoading, isStale } = useAuthStatus();

  useEffect(() => {
    if (!isLoading && isStale && !isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, isStale, isLoading, router]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading....</p>
      </div>
    );

  return children;
};

export default ProtectLayout;
