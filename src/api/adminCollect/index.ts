import { apiFetch } from "@/utils/apiFetch";
import { IAddCollectReqBody } from "./interface";

export const collectApi = {
  addCol: async (params: Partial<IAddCollectReqBody>) =>
    apiFetch("/api/collect", {
      method: "POST",
      body: JSON.stringify(params),
    }),
};
