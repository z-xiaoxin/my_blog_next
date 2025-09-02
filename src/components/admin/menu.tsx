import { lazy } from "react";
import { IconApps } from "@arco-design/web-react/icon";
import { createBrowserRouter } from "react-router-dom";

export const adminMenuList = [
  {
    path: "/article",
    title: "文章管理",
    icon: <IconApps />,
    Component: lazy(() => import("@/components/admin/layout/index")),
    children: [
      {
        path: "list",
        title: "文章列表",
        Component: lazy(() => import("@/components/admin/article/List")),
      },
      // {
      //   path: "detail",
      //   title: "文章详情",
      //   Component: lazy(() => import("@/components/admin/article/Detail")),
      // },
    ],
  },
];

// 懒加载组件

export const dashRouter = createBrowserRouter(
  [
    {
      path: "/",
      Component: lazy(() => import("@/components/admin/layout/index")),
    },
    ...adminMenuList,
  ],
  {
    basename: "/dash", // 关键！保证所有 dash 内部路由不会冲突
  }
);
