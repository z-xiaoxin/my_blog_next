import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import GetReqHeader from "@/components/layout/GetReqHeader";
import { WebVitals } from "./_components/web-vitals";
import getServerCookieTheme from "@/utils/getServerCookieTheme";
import ContentProgressBar from "@/components/layout/ContentProgressBar";
import QueryProvider from "./providers/query-provider";
import { collectApi } from "@/api/adminCollect";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xiaoxin blog",
  description: "xiaoxin blog ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = await getServerCookieTheme();

  try {
    const headersList = await headers();
    const ip =
      (headersList.get("x-forwarded-for") || headersList.get("x-real-ip")) ??
      "";
    const ua = headersList.get("user-agent") ?? "";

    console.log("ip:", ip, "ua:", ua);

    collectApi.addCol({
      event: "page_view",
      // ip,
      // ua,
    });
  } catch (error) {}

  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased relative ${theme?.value === "dark" ? "theme-dark" : ""}`}
      >
        <QueryProvider>
          <ContentProgressBar />
          <WebVitals />
          {/* <GetReqHeader /> */}
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
