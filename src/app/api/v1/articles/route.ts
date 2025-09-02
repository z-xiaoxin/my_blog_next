import type {
  IArticleAddReqBody,
  IArticleDetail,
} from "@/api/article/interface";
import { getArticleCol } from "@/api/article/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { NextRequest } from "next/server";

/**
 * Description admin 获取文章列表
 * @param {any} request:NextRequest
 * @returns {any} */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;
  const page_size = Number(searchParams.get("page_size")) || 10;

  const titleMatch = { $match: { title: { $regex: keyword, $options: "i" } } };

  try {
    const articleColIns = await getArticleCol();
    const result = await articleColIns
      .aggregate([
        {
          $facet: {
            list: [
              titleMatch,
              { $skip: (page - 1) * page_size },
              { $limit: page_size },
            ],
            total: [titleMatch, { $count: "count" }],
          },
        },
      ])
      .toArray();

    const rows: IArticleDetail[] = result[0].list;
    const total: number = result[0].total[0]?.count || 0;

    if (page > 1 && (page - 1) * page_size >= total)
      return apiResponse("OUT_OF_RANGE");
    else return apiResponse("SUCCESS", { data: { total, rows } });
  } catch (error) {
    console.log(error);

    return apiResponse("FAIL");
  }
}

/**
 * Description admin 添加文章
 * @param {any} request:NextRequest
 * @returns {any} */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as IArticleAddReqBody;

  if (!body.id)
    return apiResponse("FAIL", { messageCode: "ARTICLE_ID_NOT_FOUND" });

  try {
    const articleColIns = await getArticleCol();

    const alreadyExist = await articleColIns.findOne({ id: body.id });
    if (alreadyExist)
      return apiResponse("FAIL", { messageCode: "ARTICLE_ALREADY_EXIST" });

    const result = await articleColIns.insertOne(body);
    return apiResponse("SUCCESS", { data: result });
  } catch (error) {
    console.log(error);
    return apiResponse("FAIL");
  }
}
