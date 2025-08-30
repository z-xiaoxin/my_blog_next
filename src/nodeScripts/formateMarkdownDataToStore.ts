import fs from "fs";
import path from "path";
import crypto from "crypto";

// import { remark } from "remark";
// import remarkGfm from "remark-gfm";
// import remarkRehype from "remark-rehype";
// import rehypeHighlight from "rehype-highlight";
// import rehypeStringify from "rehype-stringify";

function hash(content: string, algorithm: string = "md5"): string {
  return crypto
    .createHash(algorithm) // 创建哈希实例
    .update(content) // 更新数据
    .digest("hex"); // 以16进制返回
}

const aimDb =
  "/Users/xiaoxin/Documents/codehub/next/first/db/article_list.json";

// const dirPath = "/Users/xiaoxin/Documents/codehub/next/first/assets";
const dirPath =
  "/Users/xiaoxin/Documents/codehub/vuepress-starter/docs/posts/adio";

async function formateMarkdownData(filePath: string) {
  const markdown = fs.readFileSync(filePath, "utf-8");

  const articleId = filePath
    .replace(dirPath + "/", "")
    .slice(0, -3)
    .split("/")
    .join("-");

  // const result = await remark()
  //   .use(remarkGfm)
  //   .use(remarkRehype) // Markdown AST → HTML AST
  //   .use(rehypeHighlight) // 高亮
  //   .use(rehypeStringify) // HTML string
  //   .process(markdown);

  return {
    id: hash(articleId),
    title: articleId,
    content: markdown,
  };
}

async function getAllFiles(dir) {
  let files: string[] = [];
  const entries = await fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // 递归子目录
      files = files.concat(await getAllFiles(fullPath));
    } else if (fullPath.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

// 使用示例
(async () => {
  const files = await getAllFiles(dirPath);
  const result = await Promise.all(files.map((i) => formateMarkdownData(i)));
  fs.writeFileSync(aimDb, JSON.stringify(result));
})();
