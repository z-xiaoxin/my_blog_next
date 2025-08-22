import { cookies } from "next/headers";

export default async function getServerCookieTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme") as
    | { name: "theme"; value: "dark" | "light" }
    | undefined;

  return {
    theme,
  };
}
