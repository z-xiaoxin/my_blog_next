# ======================
# 1. 构建阶段
# ======================
FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm -v

# 安装依赖（可根据你用的包管理器切换）
RUN pnpm install

# 复制所有源码
COPY . .

# 构建 Next.js 应用
RUN pnpm build

# ======================
# 2. 运行阶段
# ======================
FROM node:22-alpine AS runner

WORKDIR /app

# 设置 NODE_ENV
ENV NODE_ENV production

# 复制 package.json 方便后续分析
COPY package.json ./

# 只安装生产依赖
RUN pnpm install --omit=dev

# 从 builder 阶段复制构建后的文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 如果有 next.config.js，需要复制
COPY --from=builder /app/next.config.js ./

# 暴露端口
EXPOSE 3000

# 启动 Next.js
CMD ["pnpm", "start"]
