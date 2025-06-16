# Build Stage
FROM node:22-bookworm-slim AS build

WORKDIR /home/node/app
COPY package*.json ./

RUN mkdir ./packages
RUN mkdir ./packages/backend
COPY packages/backend/package.json ./packages/backend/
RUN mkdir ./packages/frontend
COPY packages/frontend/package.json ./packages/frontend/

RUN npm ci --ignore-scripts

WORKDIR /home/node/app

COPY . .

RUN npm run build

ENV NODE_ENV=production

WORKDIR packages/backend

RUN mkdir -p /home/node/.pm2 logs pids && chown -R node:node /home/node/.pm2 logs pids

USER node
EXPOSE 8081
CMD ["npm", "run", "start:pm2"]
