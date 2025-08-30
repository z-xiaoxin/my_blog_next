export const dynamic = "force-static";
import type {
  IArticleDetail,
  IArticleListReqBody,
} from "@/api/article/interface";
import articleCol from "@/api/article/mongoCol";

export async function POST(request: Request) {
  const body = (await request.json()) as IArticleListReqBody;
  console.log("body", body);
  const { title = "", page = 1, page_size = 20 } = body;
  console.log("title", title);

  const titleMatch = { $match: { title: { $regex: title, $options: "i" } } };

  try {
    const articleColIns = await articleCol;
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

    if ((page - 1) * page_size >= total)
      return Response.json({
        status: 0,
        data: { total: 0, rows: [] },
        message: "ok",
      });
    else
      return Response.json({ status: 0, data: { total, rows }, message: "ok" });
  } catch (error) {
    return Response.json({ status: 101, data: {}, message: "fail" });
  }
}
