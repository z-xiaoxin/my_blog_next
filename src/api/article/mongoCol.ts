import clientPromise from "@/lib/mongodb";

console.log("123");

const client = await clientPromise;
const db = client.db("xx_blog");

const articleCol = db.collection("article");

export default articleCol;
