import { IAddCollectReqBody } from "@/api/collect/interface";
import { getCollectCol } from "@/api/collect/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { headerGet } from "@/utils/headerOperations";
import { logger } from "@/utils/logger";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as IAddCollectReqBody;

  try {
    const collectCol = await getCollectCol();

    const colContent: IAddCollectReqBody = {
      event: body.event,
      ts: body.ts || Date.now(),
      projectId: body.projectId,
      sessionId: body.sessionId,
      visitorId: body.visitorId,
      userId: body.userId,
      url: body.url,
      referrer: body.referrer,
      title: body.title,
      screen: body.screen,
      locale: body.locale,
      ua: (body.ua || request.headers.get("user-agent")) ?? "",
      ip: (body.ip || (await headerGet.getIp(request.headers))) ?? "",
      utm: body.utm ?? { source: "", medium: "", campaign: "" },
      props: body.props ?? { btnId: "", plan: "" },
      v: body.v ?? 1,
    };

    collectCol.insertOne(colContent);
  } catch (error) {
    logger.error(error);
  }
  logger.info("collect success");
  return apiResponse("SUCCESS");
}
