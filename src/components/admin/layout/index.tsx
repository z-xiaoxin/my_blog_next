"use client";

import AdminLayoutMenu from "@/components/admin/layoutMenu";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import cls from "classnames";
import { removeLocalStorage } from "@/utils/localstorageControll";
import { ADMIN_USER_INFO } from "@/consts/storage";
import { redirect } from "next/navigation";
import { eventStop } from "@/utils/handle";

function AdminLayout() {
  const [userMenuExpand, setUserMenuExpand] = useState(false);

  const onLogout = () => {
    removeLocalStorage(ADMIN_USER_INFO);
    redirect("/dash/login");
  };

  useEffect(() => {
    const onClockOutside = () => {
      setUserMenuExpand(false);
    };

    window.addEventListener("click", onClockOutside);

    return () => {
      window.removeEventListener("click", onClockOutside);
    };
  }, []);

  return (
    <div className="w-full flex-grow max-h-[100vh] flex flex-col">
      <div className="w-full h-15 flex-none flex items-center justify-between px-5">
        <p className="flex items-center justify-center h-full text-2xl font-semibold">
          BLOG DASHBOARD
        </p>
        <div className="relative">
          <div
            onClick={(e) => {
              eventStop(e);
              setUserMenuExpand(!userMenuExpand);
            }}
            className="w-10 h-10 rounded-full overflow-hidden border-[1px] border-solid border-secondary-border p-1 hover:border-primary-color transition-all cursor-pointer"
          >
            <Icon icon="clarity:avatar-solid" className="w-full h-full" />
          </div>

          <div
            onClick={(e) => {
              eventStop(e);
              setUserMenuExpand(false);
            }}
            className={cls(
              "absolute top-10 right-0 bg-primary-bg text-primary-content shadow-normal py-1 rounded-md overflow-hidden transition-all duration-300 ease-in-out",
              userMenuExpand
                ? "translate-y-1 opacity-100 pointer-events-auto"
                : "translate-y-0 opacity-0 pointer-events-none"
            )}
          >
            <ul className="w-40">
              <li
                onClick={onLogout}
                className="hover:bg-secondary-bg cursor-pointer p-1 text-center"
              >
                退出登录
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-grow flex overflow-hidden">
        <AdminLayoutMenu />
        <div className="flex-grow bg-secondary-bg p-2">
          <div
            style={{ scrollbarWidth: "thin" }}
            className="w-full h-full flex flex-col rounded bg-primary-bg p-3 pr-2 overflow-y-scroll"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
