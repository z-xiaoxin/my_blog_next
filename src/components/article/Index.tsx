import { IResRows } from "@/api/common/interface";
import { apiFetch } from "@/utils/apiFetch";
import cls from "classnames";
import { permanentRedirect } from "next/navigation";
import indexCss from "./index.module.scss";
import clsBind from "classnames/bind";
import ArticleSearchInput from "./ArticleSearchInput";
// import WaveUp from "../common/WaveUp";

const indexStyle = clsBind.bind(indexCss);

async function ArticlePageIndex({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = (await searchParams).page || 1;
  const defaultKeyword = `${(await searchParams).keyword || ""}`;
  if (!Number(currentPage)) {
    permanentRedirect("/article?page=1");
  }

  const articleList = await apiFetch<IResRows<{ id: string; title: string }>>(
    "/api/article/list",
    { body: JSON.stringify({ page: currentPage, title: defaultKeyword ?? "" }) }
  );

  return (
    <div
      className={cls(
        "w-full md:px-8 px-4 flex-grow md:pb-8 pb-4 flex flex-col"
      )}
    >
      <div className="w-full mb-2 flex px-4">
        <ArticleSearchInput defaultKeyword={defaultKeyword} />
      </div>

      <div className={indexStyle("article-list")}>
        {articleList.data.rows.map((i) => (
          <a
            key={i.id}
            target="_blank"
            href={`article/${i.id}`}
            className={indexStyle("article-list-item")}
          >
            <div>
              <h2 className="md:text-[20px] text-[18px] md:leading-8 leading-7">
                {i.title}
              </h2>
              {/* <p className="mt-1 font-normal text-[16px] leading-6">{i.id}</p> */}
            </div>
          </a>
        ))}
      </div>

      <div className="w-full flex justify-center mt-5">
        {Array.from({ length: Math.ceil(articleList.data.total / 20) }).map(
          (i, idx) => (
            <a
              key={idx}
              href={`?page=${idx + 1}`}
              className={cls(
                "w-8 h-8 flex items-center justify-center font-semibold mx-1.5 rounded-md transition-all",
                idx + 1 === Number(currentPage)
                  ? "bg-primary-color text-white"
                  : "bg-secondary-bg hover:bg-primary-color-10percent"
              )}
            >
              {idx + 1}
            </a>
          )
        )}
      </div>

      {/* <WaveUp /> */}
    </div>
  );
}

export default ArticlePageIndex;
