import { IAdminLoginReqBody } from "@/api/adminUser/interface";
import { getAdminUserCol } from "@/api/adminUser/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";
import { generateToken, verifyToken } from "@/utils/jwtHandle";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as IAdminLoginReqBody;
  console.log("body", body);

  const adminUserCol = await getAdminUserCol();

  try {
    const result = await adminUserCol.findOne({
      uid: body.uid,
      pwd: body.pwd,
    });

    if (result) {
      const userToken = await generateToken({
        uid: result.uid,
        role: result.role ?? [],
      });

      return apiResponse("SUCCESS", { data: { token: userToken } });
    }
  } catch (error) {}

  return apiResponse("FAIL");
}
