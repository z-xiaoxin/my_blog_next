import { IAddCollectReqBody } from "@/api/adminCollect/interface";
import { getCollectCol } from "@/api/adminCollect/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { logger } from "@/utils/logger";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as IAddCollectReqBody;

  try {
    const collectCol = await getCollectCol();
    const headers = request.headers;
    const ip = headers.get("x-forwarded-for") || headers.get("x-real-ip");
    const ua = headers.get("user-agent");
    const colContent: IAddCollectReqBody = {
      event: body.event,
      ts: body.ts,
      projectId: body.projectId,
      sessionId: body.sessionId,
      visitorId: body.visitorId,
      userId: body.userId,
      url: body.url,
      referrer: body.referrer,
      title: body.title,
      screen: body.screen,
      locale: body.locale,
      ua: ua ?? "",
      ip: ip ?? "",
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
