// import clientPromise from "@/lib/mongodb";
// import { Collection } from "mongodb";

import { getDbCollection } from "@/lib/mongodb";
import { IAdminUserListItem } from "./interface";

// let adminUserCol: Collection<Document>;

// export const getAdminUserCol = async () => {
//   if (!adminUserCol) {
//     const client = await clientPromise;
//     const db = client.db("xx_blog");
//     adminUserCol = db.collection("admin_user");
//   }
//   return adminUserCol;
// };

export const getAdminUserCol = getDbCollection<IAdminUserListItem>({
  colName: "admin_user",
});
