import { apiFetch } from "@/utils/apiFetch";
import cryptoJS from "crypto-js";
import { IAdminLoginRes } from "./interface";

export const adminUserApi = {
  login: ({ uid, pwd }: { uid: string; pwd: string }) => {
    const encodePwd = cryptoJS.MD5(pwd).toString();

    return apiFetch<IAdminLoginRes>("/api/v1/admin/login", {
      uid,
      pwd: encodePwd,
    });
  },
};
