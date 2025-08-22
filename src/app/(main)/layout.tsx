import ThemeSwitch from "@/components/layout/ThemeSwitch";
import { cookies } from "next/headers";
import MainNav from "@/components/layout/MainNav";

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme") as
    | { name: "theme"; value: "dark" | "light" }
    | undefined;

  return (
    <>
      <ThemeSwitch initTheme={theme?.value ?? "light"} />
      <MainNav />

      {children}
    </>
  );
}
