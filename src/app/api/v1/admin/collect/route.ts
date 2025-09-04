import { ICollectItem } from "@/api/collect/interface";
import { getCollectCol } from "@/api/collect/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { logger } from "@/utils/logger";
import { NextRequest } from "next/server";

/**
 * Description admin 获取访问收集列表
 * @param {any} request:NextRequest
 * @returns {any} */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const event = searchParams.get("event") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const page_size = Number(searchParams.get("page_size")) || 10;

  try {
    const collectCol = await getCollectCol();

    const eventMatchArr = event ? [{ $match: { event } }] : [];

    const result = await collectCol
      .aggregate([
        ...eventMatchArr,
        { $sort: { ts: -1 } },
        {
          $facet: {
            list: [{ $skip: (page - 1) * page_size }, { $limit: page_size }],
            total: [{ $count: "count" }],
          },
        },
      ])
      .toArray();

    const rows: ICollectItem[] = result[0].list;
    const total: number = result[0].total[0]?.count || 0;

    if (page > 1 && (page - 1) * page_size >= total)
      return apiResponse("OUT_OF_RANGE");
    else return apiResponse("SUCCESS", { data: { total, rows } });
  } catch (error) {
    logger.error(error);
  }
  logger.info("collect success");
  return apiResponse("SUCCESS");
}
