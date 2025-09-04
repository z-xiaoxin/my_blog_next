import { getDbCollection } from "@/lib/mongodb";
import { IArticleDetail } from "./interface";
// import { Collection } from "mongodb";

// let articleCol: Collection<Document>;

// export const getArticleCol = async () => {
//   if (!articleCol) {
//     const client = await clientPromise;
//     const db = client.db("xx_blog");
//     articleCol = db.collection("article");
//   }
//   return articleCol;
// };

export const getArticleCol = getDbCollection<IArticleDetail>({
  colName: "article",
});
