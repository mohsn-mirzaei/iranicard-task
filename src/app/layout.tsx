import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProviders from "@/providers/query-client-provider";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Wallet-Store",
  description: "Test project for irani card - developed by Mohsen Mirzei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} antialiased`}>
        <QueryClientProviders>
          <Header />
          {children}
          <footer className="border-t py-6 bg-card/50">
            <div className="container px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} ولت استور - تمامی حقوق محفوظ است.
            </div>
          </footer>
          <Toaster />
        </QueryClientProviders>
      </body>
    </html>
  );
}
