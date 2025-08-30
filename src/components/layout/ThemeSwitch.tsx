"use client";

import { Icon } from "@iconify/react";
import cls from "classnames";
import useCookieTheme from "@/hooks/useCookieTheme";
import { useEffect, useState } from "react";
import { throttle } from "@/utils/handle";

function ThemeSwitch({ initTheme }: { initTheme: "dark" | "light" }) {
  const { theme, setTheme } = useCookieTheme(initTheme);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onWindowScroll = throttle(() => {
      if (window.scrollY) {
        setShowBackTop(true);
      } else {
        setShowBackTop(false);
      }
    }, 100);

    window.addEventListener("scroll", onWindowScroll);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-15 right-0 z-50 overflow-hidden p-2 pr-0 ">
      <div
        className={cls(
          "p-2 shadow-normal pr-1 rounded-l-full flex justify-center items-center bg-primary-bg text-primary-content group hover:translate-x-0 transition-all duration-300 cursor-pointer",
          showBackTop ? "translate-x-[42px]" : "translate-x-[14px]"
        )}
      >
        {/* 导致了 icon 闪烁 */}
        {/* <Icon
          className="translate-x-[60%] group-hover:translate-x-0 transition-all duration-300"
          icon={theme === "light" ? "ph:sun-bold" : "ph:moon-bold"}
          width={20}
          height={20}
        /> */}
        <div className="flex items-center">
          <div
            title={theme}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-5 h-5 translate-x-[60%] group-hover:translate-x-0 transition-all duration-300"
          >
            {theme === "light" ? (
              <Icon icon="ph:sun-bold" className="w-full h-full" />
            ) : (
              <Icon icon="ph:moon-bold" className="w-full h-full" />
            )}
          </div>

          <div
            title="返回顶部"
            onClick={() => window.scrollTo(0, 0)}
            className={cls(
              "h-5 translate-x-[60%] group-hover:translate-x-0 transition-all duration-300",
              showBackTop ? "w-5 ml-2 opacity-100" : "w-0 ml-0 opacity-0"
            )}
          >
            <Icon icon="uil:top-arrow-from-top" className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitch;
