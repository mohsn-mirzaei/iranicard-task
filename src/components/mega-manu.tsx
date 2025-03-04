"use client";
import useMegaMenu from "@/services/mega-menus";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function MegaMenu() {
  const { data, isError, isLoading } = useMegaMenu();

  return (
    <div className="absolute hidden group-hover:block top-full left-44 -right-32 bg-white shadow-lg rounded-b-lg z-20 w-[400px] p-4">
      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {data?.map((category) => (
          <div key={category.id}>
            <h3 className="font-bold text-lg mb-2">{category.menuName}</h3>
            <ul className="space-y-1">
              {category.symbol.map((s) => (
                <li key={s.id}>
                  <a href="#" className="hover:underline">
                    {s.symbol}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
