import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebVitals } from "./_components/web-vitals";
import getServerCookieTheme from "@/utils/getServerCookieTheme";
import ContentProgressBar from "@/components/layout/ContentProgressBar";
import QueryProvider from "./providers/query-provider";
import { collectApi } from "@/api/collect";
import { headers } from "next/headers";
import { headerGet } from "@/utils/headerOperations";

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
    const headersIns = await headers();
    const ip = await headerGet.getIp(headersIns);
    const ua = headersIns.get("user-agent") ?? "";
    const url = `${headersIns.get("x-href") || ""}`;
    if (!url.includes("/dash/")) {
      collectApi.addCol({
        event: "page_view",
        url,
        ip,
        ua,
      });
    }
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
