import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

export const headerGet = {
  getIp: async (headersIns?: Headers | ReadonlyHeaders) => {
    const headersInstance = headersIns || (await headers());
    const ipListStr =
      headersInstance.get("x-forwarded-for") ||
      headersInstance.get("x-real-ip");
    const ipList = ipListStr?.split(",") || [];
    const ip = (ipList[0] || "").trim().replace("::ffff:", "");
    return ip;
  },
};
