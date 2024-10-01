# ベースイメージとしてnodeを使用
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# サーバー起動
CMD ["npm", "run", "dev"]
