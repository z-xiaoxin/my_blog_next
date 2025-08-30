import { IResCommon } from "@/api/common/interface";

export const apiFetch = async <T extends object = object>(
  url: string,
  options?: RequestInit
) => {
  const isClient = process.title === "browser";
  if (!isClient && url && url.startsWith("/"))
    url = process.env.NEXT_PUBLIC_SITE_URL + url;

  try {
    const fetchResult = await fetch(url, { method: "POST", ...options });

    if (fetchResult.status === 200) {
      return fetchResult.json() as Promise<IResCommon<T>>;
    } else {
      return Promise.reject({
        status: fetchResult.status,
        message: "请求失败 1",
      });
    }
  } catch (error) {
    return Promise.reject({
      status: -1,
      message: "请求失败 2",
    });
  }
};
