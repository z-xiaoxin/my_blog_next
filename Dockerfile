# ======================
# 1. 构建阶段
# ======================
FROM node:22-alpine AS builder

# 启用 corepack 并激活 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 安装必要依赖
# RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

RUN pnpm fetch

# 复制源码
COPY . .

# 安装依赖
RUN pnpm install --frozen-lockfile --offline

# 构建 Next.js
RUN pnpm build

# ======================
# 2. 运行阶段
# ======================
FROM node:22-alpine AS runner

WORKDIR /app

# RUN apk add --no-cache libc6-compat

# 启用 corepack 并激活 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

ENV NODE_ENV production

# 只复制生产所需文件
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]
