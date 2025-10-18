import "@ant-design/v5-patch-for-react-19";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Providers from "./providers/Providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UpJet Test",
  description: "Тестовое задание для компании UpJet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
