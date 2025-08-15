"use client";

import Cookies from "js-cookie";
import { updateDomTheme } from "@/utils/themeControl";
import { useCallback, useEffect, useState } from "react";

function ThemeSwitch({ initTheme }: { initTheme: "dark" | "light" }) {
  const [theme, setTheme] = useState<"dark" | "light">(initTheme);

  const themeChange = useCallback(() => {
    const targetTheme = theme === "light" ? "dark" : "light";
    setTheme(targetTheme);
  }, [theme]);

  useEffect(() => {
    Cookies.set("theme", theme);

    updateDomTheme(theme);
  }, [theme]);

  return (
    <div
      onClick={themeChange}
      className="absolute bottom-5 right-5 w-20 h-10 rounded-full flex justify-center items-center bg-[#409eff]"
    >
      to {theme === "light" ? "dark" : "light"}
    </div>
  );
}

export default ThemeSwitch;
