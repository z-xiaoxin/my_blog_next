import {
  IAddAdminUserReqBody,
  IAdminUserListItem,
} from "@/api/adminUser/interface";
import { getAdminUserCol } from "@/api/adminUser/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const page_size = Number(searchParams.get("page_size")) || 10;

  try {
    const adminUserCol = await getAdminUserCol();

    const result = await adminUserCol
      .aggregate([
        {
          $facet: {
            list: [{ $skip: (page - 1) * page_size }, { $limit: page_size }],
            total: [{ $count: "count" }],
          },
        },
      ])
      .toArray();

    const rows: IAdminUserListItem[] = result[0].list;
    const total: number = result[0].total[0]?.count || 0;

    if (page > 1 && (page - 1) * page_size >= total)
      return apiResponse("OUT_OF_RANGE");
    return apiResponse("SUCCESS", { data: { rows, total } });
  } catch (error) {
    return apiResponse("FAIL");
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as IAddAdminUserReqBody;

  if (!body.uid || !body.pwd || !body.username) return apiResponse("FAIL");

  const userInfo: IAddAdminUserReqBody = {
    username: body.username,
    pwd: body.pwd,
    avatar: body.avatar ?? "",
    role: body.role ?? [],
    uid: body.uid,
  };

  try {
    const adminUserCol = await getAdminUserCol();

    const alreadyExist = await adminUserCol.findOne({ uid: body.uid });
    if (alreadyExist)
      return apiResponse("FAIL", { messageCode: "ADMIN_USER_ALREADY_EXIST" });

    const result = await adminUserCol.insertOne(userInfo);
    return apiResponse("SUCCESS", { data: result });
  } catch (error) {
    return apiResponse("FAIL");
  }
}
