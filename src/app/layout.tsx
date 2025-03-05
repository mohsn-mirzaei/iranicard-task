import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProviders from "@/providers/query-client-provider";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
            <div className="container px-4 text-center text-sm text-muted-foreground mx-auto">
              © {new Date().getFullYear()} ولت استور - تمامی حقوق محفوظ است.
            </div>
          </footer>
          <Toaster />
          <NextTopLoader
            color="#000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #000,0 0 5px #000"
            template='<div class="bar" role="bar">
                            <div class="peg"></div>
                          </div> 
                          <div class="spinner hidden" role="spinner">
                            <div class="spinner-icon"></div>
                          </div>'
            zIndex={1600}
            showAtBottom={false}
          />
        </QueryClientProviders>
      </body>
    </html>
  );
}
