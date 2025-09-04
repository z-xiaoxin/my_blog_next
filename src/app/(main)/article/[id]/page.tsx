import { IArticleDetail } from "@/api/article/interface";
import MDArticle from "@/components/article/MDArticle";
import { apiFetch } from "@/utils/apiFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getArticleDetail = cache((article_id: string) => {
  return apiFetch<IArticleDetail>("/api/articles/detail", { article_id });
});

async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const articleRes = await getArticleDetail(id);

    return (
      <>
        <MDArticle articleDetail={articleRes} />
      </>
    );
  } catch (err) {
    // const error = err as IResCommon;
    // if(error.messageCode === "NOT_FOUND")
    notFound();
  }
}

export default ArticleDetailPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const articleRes = await getArticleDetail(id);

  return {
    title: articleRes.title,
    description: `文章名称${articleRes.title}`,
    keywords: `文章、${articleRes.title}`,
  };
}
