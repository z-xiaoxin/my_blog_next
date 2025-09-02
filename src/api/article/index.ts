import { IArticleListItem, IArticleListReqBody } from "./interface";
import { apiFetch } from "@/utils/apiFetch";
import { IResRows } from "../common/interface";
export const articleApi = {
  getList: async (body: IArticleListReqBody) =>
    await apiFetch<IResRows<IArticleListItem>>("/api/articles/list", {
      body: JSON.stringify(body),
    }),
};

export const dashArticleApi = {
  getList: async (body: IArticleListReqBody) => {
    const queryStr = Object.entries(body)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return await apiFetch<IResRows<IArticleListItem>>(
      "/api/v1/articles" + (queryStr ? `?${queryStr}` : ""),
      {
        method: "GET",
      }
    );
  },

  deleteOne: async (_id: string) =>
    await apiFetch("/api/v1/articles/" + _id, {
      method: "DELETE",
    }),
};
