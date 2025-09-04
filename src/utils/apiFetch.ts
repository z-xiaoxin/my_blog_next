import { IResCommon } from "@/api/common/interface";
import { getLocalStorage } from "./localstorageControll";
import { IAdminLoginRes } from "@/api/adminUser/interface";
import { ADMIN_USER_INFO } from "@/consts/storage";

export const apiFetch = async <T extends object = object>(
  url: string,
  body: object,
  options?: RequestInit
): Promise<T> => {
  const isClient = process.title === "browser";
  if (!isClient && url && url.startsWith("/"))
    url = process.env.NEXT_PUBLIC_SITE_URL + url;

  const { method = "POST" } = options || {};
  if (method === "GET") {
    const queryStr = Object.entries(body)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    if (queryStr) url += `?${queryStr}`;
  }

  const commonHeaders: HeadersInit = {};
  if (isClient) {
    const token = getLocalStorage<IAdminLoginRes>(ADMIN_USER_INFO)?.token ?? "";
    if (token) commonHeaders.authorization = `Bearer ${token}`;
  }

  try {
    const fetchResult = await fetch(url, {
      method: "POST",
      body: method === "GET" ? undefined : JSON.stringify(body),
      ...options,
      headers: { ...commonHeaders, ...options?.headers },
    });

    if (!fetchResult.ok) {
      return Promise.reject({
        status: fetchResult.status,
        messageCode: "NETWORK_ERROR",
        data: {},
      });
    }

    const dataResult = (await fetchResult.json()) as IResCommon<T>;

    if (dataResult.status !== 0) return Promise.reject(dataResult);

    return Promise.resolve<T>(dataResult.data);
  } catch (error) {
    console.log("error", error);

    return Promise.reject({
      status: -1,
      messageCode: "FETCH_ERROR",
      data: {},
    });
  }
};
