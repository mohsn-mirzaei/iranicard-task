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
      <body
        className={`${vazirmatn.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
