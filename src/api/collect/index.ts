import { ICollectItem, ICollectListReqBody } from "@/api/collect/interface";
import { apiFetch } from "@/utils/apiFetch";
import { IAddCollectReqBody } from "./interface";
import { IResRows } from "../common/interface";

export const collectApi = {
  addCol: async (params: Partial<IAddCollectReqBody>) =>
    apiFetch("/api/collect", params),
};

export const dashCollectApi = {
  getList: async (body: ICollectListReqBody) =>
    await apiFetch<IResRows<ICollectItem>>("/api/v1/admin/collect", body, {
      method: "GET",
    }),
};
