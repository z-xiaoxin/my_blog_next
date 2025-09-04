import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jwtHandle";
import { apiResponse } from "./api/common/apiHandle";
// import { verifyToken } from "@/lib/auth";

const needAuthorizePaths = [
  "/api/v1/articles",
  "/api/v1/admin/users",
  "/api/v1/admin/collect",
];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // 获取 Token
  // const token = req.cookies.get("authorization")?.value;

  // 公共路由，直接放行
  if (pathname.startsWith("/dash/login") || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    const targetPath = needAuthorizePaths.find((i) => pathname.startsWith(i));
    if (targetPath) {
      const token = (req.headers.get("authorization") ?? "").replace(
        "Bearer ",
        ""
      );
      console.log("req.headers token", token);

      if (!token) return apiResponse("UNAUTHORIZED");

      try {
        await verifyToken(token);
      } catch (error) {
        return apiResponse("UNAUTHORIZED");
      }
      return NextResponse.next();
    }
  } else {
    const response = NextResponse.next();
    response.headers.set("x-href", url.href);
    return response;
  }

  // 如果访问 dash，要求管理员权限
  // if (pathname.startsWith("/dash")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/dash/login", url));
  //   } else {
  //     const payload = await verifyToken(token);
  //     // if (!payload || payload.role !== "admin") {
  //     //   return NextResponse.redirect(new URL("/403", url));
  //     // }
  //     return NextResponse.next();
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
