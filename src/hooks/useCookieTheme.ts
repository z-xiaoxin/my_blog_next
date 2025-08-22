import { IThemeStyle } from "@/api/style/interface";
import { updateDomTheme } from "@/utils/themeControl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useCookieTheme(initTheme: IThemeStyle = "light") {
  const [theme, setTheme] = useState<IThemeStyle>(initTheme);

  useEffect(() => {
    let currentTheme = Cookies.get("theme");

    if (!currentTheme) {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      currentTheme = isSystemDark ? "dark" : "light";
    }
    setTheme(currentTheme === "dark" ? "dark" : "light");
  }, []);

  const updateTheme = (theme: IThemeStyle) => {
    setTheme(theme);
    Cookies.set("theme", theme);
    updateDomTheme(theme);
  };

  return {
    theme,
    setTheme: updateTheme,
  };
}
