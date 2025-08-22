import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GetReqHeader from "@/components/layout/GetReqHeader";
import { WebVitals } from "./_components/web-vitals";
import getServerCookieTheme from "@/utils/getServerCookieTheme";

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased relative ${theme?.value === "dark" ? "theme-dark" : ""}`}
      >
        <WebVitals />
        <GetReqHeader />
        {children}
      </body>
    </html>
  );
}
