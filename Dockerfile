# Build Stage
FROM node:22-bookworm-slim AS build

WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci --ignore-scripts

RUN mkdir ./packages

RUN mkdir ./packages/backend
WORKDIR /home/node/app/packages/backend
COPY packages/backend/package*.json ./
RUN npm ci --ignore-scripts

RUN mkdir /home/node/app/packages/frontend
WORKDIR /home/node/app/packages/frontend
COPY packages/frontend/package*.json ./
RUN npm ci --ignore-scripts

WORKDIR /home/node/app

COPY . .

RUN npm run build

ENV NODE_ENV=production

WORKDIR packages/backend
RUN npm ci --only=production --ignore-scripts

RUN mkdir -p /home/node/.pm2 logs pids && chown -R node:node /home/node/.pm2 logs pids

USER node
EXPOSE 8081
CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]
