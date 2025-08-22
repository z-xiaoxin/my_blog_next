import { headers } from "next/headers";

async function GetReqHeader() {
  const reqHeaders = await headers();

  if (process.title !== "browser") {
    console.log("reqHeader keys:", [...reqHeaders.keys()].join(","));
    console.log("reqHeader host:", reqHeaders.get("x-forwarded-host"));
    console.log("reqHeader for:", reqHeaders.get("x-forwarded-for"));
  }

  return <></>;
}

export default GetReqHeader;
