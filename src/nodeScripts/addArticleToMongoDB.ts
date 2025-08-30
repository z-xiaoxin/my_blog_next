import fs from "fs";
import path from "path";

import { MongoClient } from "mongodb";

const uri = "mongodb://admin:123456@localhost:27017" as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// 开发环境复用同一个连接，避免热重载导致多个连接
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // 生产环境直接创建
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

const articlePath = path.resolve("./db/article_list.json");

const content = fs.readFileSync(articlePath, { encoding: "utf-8" });
const contentJson = JSON.parse(content) as {
  id: string;
  title: string;
  content: string;
}[];

(async () => {
  const clientIns = await clientPromise;
  const db = clientIns.db("xx_blog");
  const xxBlogCollection = db.collection("article");

  contentJson.forEach((i) => {
    xxBlogCollection.insertOne(i);
  });
})();
// (async () => {
//   const clientIns = await clientPromise;
//   const db = clientIns.db("xx_blog");
//   const xxBlogCollection = db.collection("article");

//   const data = await xxBlogCollection.find({}).toArray();

//   console.log(data.length);
// })();
