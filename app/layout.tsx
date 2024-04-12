import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ToasProvider from "@/components/providers/toaster-providedr";
import "./globals.css";

const inter = Roboto({ weight:["100","300","500","900"],subsets:[]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToasProvider />
      {children}</body>
    </html>
  );
}
