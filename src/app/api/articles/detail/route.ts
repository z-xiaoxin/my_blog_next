import { getArticleCol } from "@/api/article/mongoCol";
import { apiResponse } from "@/api/common/apiHandle";

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
    const articleColIns = await getArticleCol();

    const articles = await articleColIns
      .find({ id: body.article_id })
      .toArray();

    if (articles.length) return apiResponse("SUCCESS", { data: articles[0] });
    else return apiResponse("NOT_FOUND");
  } catch (error) {
    return apiResponse("FAIL");
  }
}
