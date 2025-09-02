import clientPromise from "@/lib/mongodb";
import { Collection } from "mongodb";

let adminUserCol: Collection<Document>;

export const getAdminUserCol = async () => {
  if (!adminUserCol) {
    const client = await clientPromise;
    const db = client.db("xx_blog");
    adminUserCol = db.collection("admin_user");
  }
  return adminUserCol;
};
