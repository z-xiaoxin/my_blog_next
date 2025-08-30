import { MongoClient } from "mongodb";

const uri = process.env.NEXT_MONGO_DB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_MONGO_DB_URI) {
  throw new Error(
    "❌ Please define the NEXT_MONGO_DB_URI environment variable inside .env"
  );
}

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
