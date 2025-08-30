
# 一级标题 H1

## 二级标题 H2

### 三级标题 H3

#### 四级标题 H4

##### 五级标题 H5

###### 六级标题 H6

---

这是一个段落，包含**加粗**、*斜体*、***加粗斜体***、~~删除线~~。

这里有一段 `行内代码` 示例。

---

## 链接

- [外部链接](https://www.example.com)
- [内部锚点](#二级标题-h2)

---

## 图片

![示例图片](https://via.placeholder.com/150 "图片标题")

---

## 列表

### 无序列表
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

### 有序列表
1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个任务

---

## 表格

| 姓名   | 年龄 | 城市       |
|--------|----:|-----------|
| Alice  |  25 | 北京       |
| Bob    |  30 | 上海       |
| Charlie|  28 | 深圳       |

---

## 引用

> 这是引用内容
>
> 多行引用测试

---

## 分隔线

---

## 代码块

### JavaScript
```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("World");
```

### TypeScript
```ts
interface User {
  name: string;
  age: number;
}
const user: User = { name: "Alice", age: 25 };
```

### JSON
```json
{
  "name": "Next.js",
  "version": "15.0.0",
  "theme": "tech"
}
```

### Bash
```bash
# 安装依赖
npm install
# 启动开发服务器
npm run dev
```

---

## 脚注

这是一个带脚注的例子[^1]。

[^1]: 这是脚注内容

---

## 内联 HTML

<div style="color:#0FF; background:#0F0F1A; padding:4px; border-radius:4px;">
  这是内联 HTML 块
</div>

---

## Emoji

- 😀 😎 🚀 💻 🖤

---

## 强调

- **加粗**  
- *斜体*  
- ***加粗斜体***  
- ~~删除线~~

---

## 自动链接

- URL: https://example.com  
- Email: test@example.com

---

## 表情 + 链接 + 代码综合示例

Hello **World**! 🚀  
Check out [Next.js](https://nextjs.org) and try this code:

```ts
const techColor = "#0FF";
console.log(`科技色: ${techColor}`);
```

---

## 结束语

感谢使用此 Markdown 测试文档，它覆盖了绝大多数 Markdown 语法，可以直接用来：

- 测试 **remark + rehype** 渲染器  
- 检查 **Tailwind 科技风主题效果**  
- 调试 **代码高亮、Typography 样式、暗黑模式**  
