import { MongoClient } from "mongodb";

const originDataUri = "mongodb://admin:123456@localhost:27017";
const targetDataUri = "mongodb://admin:not123456@8.148.204.76:27017";

const options = {};

const originMongo = await new MongoClient(originDataUri, options).connect();
const targetMongo = await new MongoClient(targetDataUri, options).connect();

const localData = await originMongo
  .db("xx_blog")
  .collection("article")
  .find()
  .toArray();

console.log(localData.length, "localData");

localData.forEach((i) => {
  targetMongo
    .db("xx_blog")
    .collection("article")
    .insertOne({ id: i.id, title: i.title, content: i.content });
});
