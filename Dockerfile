# Build Stage
FROM node:22-bookworm-slim AS build

WORKDIR /home/node/app
RUN npm install -g corepack@latest
RUN corepack enable pnpm
COPY package*.json pnpm*.yaml  ./

RUN mkdir ./packages
RUN mkdir ./packages/backend
WORKDIR /home/node/app/packages/backend
COPY packages/backend/package.json ./

WORKDIR /home/node/app
RUN mkdir ./packages/frontend
WORKDIR /home/node/app/packages/frontend
COPY packages/frontend/package.json ./

RUN pnpm i --ignore-scripts

WORKDIR /home/node/app

COPY . .

RUN pnpm run build

ENV NODE_ENV=production

WORKDIR packages/backend
RUN pnpm i --only=production --ignore-scripts

RUN mkdir -p /home/node/.pm2 logs pids && chown -R node:node /home/node/.pm2 logs pids

USER node
EXPOSE 8081
CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]
