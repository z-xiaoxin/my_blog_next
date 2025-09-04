import { IArticleListItem, IArticleListReqBody } from "./interface";
import { apiFetch } from "@/utils/apiFetch";
import { IResRows } from "../common/interface";
import { ObjectId } from "mongodb";
export const articleApi = {
  getList: async (body: IArticleListReqBody) =>
    await apiFetch<IResRows<IArticleListItem>>("/api/articles/list", body),
};

export const dashArticleApi = {
  getList: async (body: IArticleListReqBody) => {
    return await apiFetch<IResRows<IArticleListItem>>(
      "/api/v1/articles",
      body,
      { method: "GET" }
    );
  },

  getDetail: async (_id: ObjectId) =>
    await apiFetch<IArticleListItem>(
      "/api/v1/articles/" + _id,
      {},
      {
        method: "GET",
      }
    ),

  deleteOne: async (_id: ObjectId) =>
    await apiFetch(
      "/api/v1/articles/" + _id,
      {},
      {
        method: "DELETE",
      }
    ),

  updateOne: async (_id: ObjectId, body: { title: string; content: string }) =>
    await apiFetch("/api/v1/articles/" + _id, body, {
      method: "PUT",
    }),
};
