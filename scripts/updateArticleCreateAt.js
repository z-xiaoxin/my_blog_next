import { MongoClient } from "mongodb";

// const originDataUri = "mongodb://admin:123456@localhost:27017";
const originDataUri = "mongodb://admin:not123456@8.148.204.76:27017";

const options = {};

try {
  const originMongo = await new MongoClient(originDataUri, options).connect();

  const articleCol = await originMongo.db("xx_blog").collection("article");

  const timeout = Date.now();

  articleCol.find().forEach((i) => {
    articleCol.updateOne(
      { _id: i._id },
      { $set: { create_at: timeout, update_at: timeout } }
    );
  });
} catch (error) {}
