"use client";

import { Icon } from "@iconify/react";
import useCookieTheme from "@/hooks/useCookieTheme";

function ThemeSwitch({ initTheme }: { initTheme: "dark" | "light" }) {
  const { theme, setTheme } = useCookieTheme(initTheme);

  return (
    <div className="absolute bottom-15 right-0 z-50 overflow-hidden p-2 pr-0 ">
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
          <div className="w-5 h-5">
            {theme === "light" ? (
              <Icon icon="ph:sun-bold" width={20} height={20} />
            ) : (
              <Icon icon="ph:moon-bold" width={20} height={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitch;
