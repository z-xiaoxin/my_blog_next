import { IArticleDetail } from "@/api/article/interface";
import ArticleNotFound from "@/components/article/ArticleNotFound";
import MDArticle from "@/components/article/MDArticle";
import { apiFetch } from "@/utils/apiFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getArticleDetail = cache((article_id: string) => {
  return apiFetch<IArticleDetail>("/api/article/detail", {
    body: JSON.stringify({ article_id }),
  });
});

async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const articleRes = await getArticleDetail(id);

  const articleNotfound = articleRes.status !== 0;
  if (articleNotfound) notFound();

  return (
    <>
      {articleNotfound ? (
        <ArticleNotFound />
      ) : (
        <MDArticle articleDetail={articleRes.data} />
      )}
    </>
  );
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
    title: articleRes.data.title,
    description: `文章名称${articleRes.data.title}`,
    keywords: `文章、${articleRes.data.title}`,
  };
}
