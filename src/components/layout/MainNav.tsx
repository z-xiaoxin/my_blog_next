"use client";

import { Icon } from "@iconify/react";
import moduleStyle from "./mainNav.module.scss";
import cls from "classnames";
import clsBind from "classnames/bind";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mCls = clsBind.bind(moduleStyle);

const navList = [
  { name: "首页", path: "/", icon: "material-symbols:home" },
  { name: "文章", path: "/article", icon: "material-symbols:article" },
  { name: "关于我", path: "/about", icon: "clarity:avatar-solid" },
  { name: "邮箱", path: "/about", icon: "clarity:email-solid" },
  {
    name: "github",
    target: "_blank",
    path: "https://github.com/z-xiaoxin",
    icon: "mingcute:github-fill",
  },
];

function MainNav() {
  const pathname = usePathname();

  const currentNavIndex = useMemo(() => {
    const index = navList.findIndex((item) => item.path === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  const [hoverIndex, setHoverIndex] = useState(currentNavIndex);
  const [activeIndex, setActiveIndex] = useState(currentNavIndex);

  return (
    <div className={cls("w-full flex")}>
      <nav className={cls("flex justify-between items-center p-4 m-auto")}>
        <div
          onMouseLeave={() => setHoverIndex(activeIndex)}
          className={cls("flex items-center gap-x-4 h-[76px]")}
        >
          {navList.map((item, index) => (
            <Link
              href={item.path}
              target={item.target ?? "_self"}
              title={item.name}
              key={index}
              className={cls(
                mCls("nav-item"),
                index === hoverIndex ? mCls("nav-item_active") : "",
                hoverIndex + 1 === index || hoverIndex - 1 === index
                  ? mCls("nav-item-active_near")
                  : ""
              )}
              onMouseEnter={() => setHoverIndex(index)}
              onClick={() => item.name !== "github" && setActiveIndex(index)}
            >
              <div className={cls(mCls("nav-item-icon"))}>
                <Icon icon={item.icon ?? ""} width={40} height={40} />
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default MainNav;
