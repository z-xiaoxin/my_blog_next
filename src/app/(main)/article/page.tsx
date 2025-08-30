import ArticlePageIndex from "@/components/article/Index";

function ArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <ArticlePageIndex searchParams={searchParams} />;
}

export default ArticlePage;
