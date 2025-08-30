import { remark } from "remark";
import remarkGfm from "remark-gfm";
// import html from "remark-html";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import MDArticleOutline from "./MDArticleOutline";
import "./MDArticle.scss";
import { IArticleDetail } from "@/api/article/interface";

export default async function MDArticle({
  articleDetail,
}: {
  articleDetail: IArticleDetail;
}) {
  const markdown = articleDetail.content;

  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype) // Markdown AST → HTML AST
    .use(rehypeHighlight) // 高亮
    .use(rehypeStringify) // HTML string
    .process(markdown);

  return (
    <div className="w-full px-8 pb-10">
      <MDArticleOutline />

      {/* 文章内容 */}
      <div
        id="xx-article-content"
        className="xx-md mx-auto xx-md-normal xx-md-xl max-md:xx-md-sm  max-w-[1200px]"
        dangerouslySetInnerHTML={{ __html: result.toString() }}
      ></div>
    </div>
  );
}
