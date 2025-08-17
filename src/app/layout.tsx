import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme") as
    | { name: "theme"; value: "dark" | "light" }
    | undefined;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased relative ${theme?.value === "dark" ? "theme-dark" : ""}`}
      >
        <ThemeSwitch initTheme={theme?.value ?? "light"} />
        {children}
      </body>
    </html>
  );
}
