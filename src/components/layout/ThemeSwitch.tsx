"use client";

import Cookies from "js-cookie";
import { updateDomTheme } from "@/utils/themeControl";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

function ThemeSwitch({ initTheme }: { initTheme: "dark" | "light" }) {
  const [theme, setTheme] = useState<"dark" | "light">(initTheme);

  /**
   * 修改主题样式 */
  const themeChange = useCallback(() => {
    const targetTheme = theme === "light" ? "dark" : "light";
    setTheme(targetTheme);
  }, [theme]);

  useEffect(() => {
    const currentTheme = Cookies.get("theme");

    if (!currentTheme) {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const targetTheme = isSystemDark ? "dark" : "light";
      setTheme(targetTheme);
    }
  }, []);

  useEffect(() => {
    Cookies.set("theme", theme);
    updateDomTheme(theme);
  }, [theme]);

  return (
    <div className="absolute bottom-15 right-0 z-50 overflow-hidden p-2 pr-0 ">
      <div
        onClick={themeChange}
        className="p-2 shadow-normal pr-1 rounded-l-full flex justify-center items-center bg-primary-bg text-primary-content translate-x-[40%] group hover:translate-x-0 transition-all duration-300 cursor-pointer"
      >
        {/* 导致了 icon 闪烁 */}
        {/* <Icon
          className="translate-x-[60%] group-hover:translate-x-0 transition-all duration-300"
          icon={theme === "light" ? "ph:sun-bold" : "ph:moon-bold"}
          width={20}
          height={20}
        /> */}
        <div
          title={theme}
          className="translate-x-[60%] group-hover:translate-x-0 transition-all duration-300"
        >
          {theme === "light" ? (
            <Icon icon="ph:sun-bold" width={20} height={20} />
          ) : (
            <Icon icon="ph:moon-bold" width={20} height={20} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitch;
