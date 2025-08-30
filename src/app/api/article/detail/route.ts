import { getArticleCol } from "@/api/article/mongoCol";

// import clientPromise from "@/lib/mongodb";
export const dynamic = "force-static";

interface IReqBody {
  article_id: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as IReqBody;
  if (!body.article_id)
    return Response.json({
      status: 100,
      data: [],
      message: "article_id not found",
    });

  try {
    // const client = await clientPromise;
    // const db = client.db("xx_blog");
    const articleColIns = await getArticleCol();

    const articles = await articleColIns
      .find({ id: body.article_id })
      .toArray();

    if (articles.length)
      return Response.json({ status: 0, data: articles[0], message: "ok" });
    else
      return Response.json({
        status: 102,
        data: {},
        message: "article not found",
      });
  } catch (error) {
    return Response.json({ status: 101, data: [], message: "fail" });
  }
}
