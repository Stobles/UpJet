import "@ant-design/v5-patch-for-react-19";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "./providers/Providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  console.table({
    "HTTP статус": `sdfsd`,
    "URL запроса": "dfsdfsd",
    Method: "sdfsdfs",
  });
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
