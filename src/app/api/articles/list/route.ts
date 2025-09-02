export const dynamic = "force-static";
import type {
  IArticleDetail,
  IArticleListReqBody,
} from "@/api/article/interface";
import { getArticleCol } from "@/api/article/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";

export async function POST(request: Request) {
  const body = (await request.json()) as IArticleListReqBody;
  const { keyword = "", page = 1, page_size = 20 } = body;

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
    return apiResponse("FAIL");
  }
}
