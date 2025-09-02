import type { IArticleUpdateReqBody } from "@/api/article/interface";
import { getArticleCol } from "@/api/article/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { verifyToken } from "@/utils/jwtHandle";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

/**
 * Description admin 更新文章
 * @param {any} request:NextRequest
 * @param {any} {params}:{params:Promise<{_id:string}>}
 * @returns {any} */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  const { _id } = await params;
  const body = (await request.json()) as IArticleUpdateReqBody;
  const { title, content = "" } = body;

  try {
    const articleColIns = await getArticleCol();
    const result = await articleColIns.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { title, content, update_at: Date.now() } },
      { returnDocument: "after" }
    );

    if (result)
      return apiResponse("SUCCESS", {
        data: result,
      });
    else return apiResponse("NOT_FOUND");
  } catch (error) {
    return apiResponse("FAIL");
  }
}

/**
 * Description admin 删除文章
 * @param {any} _:NextRequest
 * @param {any} {params}:{params:Promise<{_id:string}>}
 * @returns {any} */
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  const headersList = await headers();
  const authorization = headersList.get("authorization");

  console.log("authorization", authorization);
  if (!authorization) return apiResponse("FAIL");

  try {
    const token = await verifyToken(authorization.replace("Bearer ", ""));
    console.log("token", token);
  } catch (error) {
    return apiResponse("UNAUTHORIZED");
  }

  const { _id } = await params;

  try {
    const articleColIns = await getArticleCol();
    const result = await articleColIns.deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount > 0)
      return apiResponse("SUCCESS", { data: result });
    else return apiResponse("FAIL", { data: result });
  } catch (error) {
    console.log(error);
    return apiResponse("FAIL");
  }
}

/**
 * Description admin 获取文章详情
 * @param {any} _:NextRequest
 * @param {any} {params}:{params:Promise<{_id:string}>}
 * @returns {any} */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  const { _id } = await params;
  try {
    const articleColIns = await getArticleCol();
    const result = await articleColIns.findOne({ _id: new ObjectId(_id) });

    if (result) return apiResponse("SUCCESS", { data: result });
    else return apiResponse("NOT_FOUND");
  } catch (error) {
    return apiResponse("FAIL");
  }
}
