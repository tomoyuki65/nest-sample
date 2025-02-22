####################
# ビルドステージ
####################
FROM node:22.13-alpine3.21 AS builder

ENV NODE_ENV=production

RUN npm install -g @nestjs/cli

WORKDIR /build
COPY . .

RUN npm ci
RUN npm run build

####################
# 実行ステージ
####################
FROM node:22.13-alpine3.21 AS runnner

ENV NODE_ENV=production

WORKDIR /app

# コンテナ用ユーザー作成
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser

# ビルドステージからファイルをコピー
COPY --from=builder --chown=appuser:appuser /build/dist ./dist
COPY --from=builder --chown=appuser:appuser /build/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /build/.env.production ./.env
COPY --from=builder --chown=appuser:appuser /build/src/schema.gql ./src/schema.gql

# コンテナのポート番号
EXPOSE 3000

# コンテナ起動ユーザー
USER appuser

# サーバー起動
CMD ["node", "dist/main"]