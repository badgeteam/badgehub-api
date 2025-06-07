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

RUN mkdir ./packages/frontend
WORKDIR /home/node/app/packages/frontend
COPY packages/frontend/package*.json ./
RUN cd npm ci --ignore-scripts

WORKDIR /home/node/app

COPY . .

RUN npm run build

# Prod stage
FROM node:22-bookworm-slim

WORKDIR /home/node/app
ENV NODE_ENV=production

# Copy only needed files
RUN mkdir packages
RUN mkdir packages/backend
RUN mkdir packages/frontend

COPY  --chown=node:node --from=build /home/node/app/packages/backend/package*.json packages/backend/

COPY  --chown=node:node --from=build /home/node/app/packages/backend/dist packages/backend/dist
COPY  --chown=node:node --from=build /home/node/app/packages/backend/database.json packages/backend/database.json
COPY  --chown=node:node --from=build /home/node/app/packages/backend/migrations packages/backend/migrations

COPY  --chown=node:node --from=build /home/node/app/packages/frontend/dist packages/frontend/dist
COPY  --chown=node:node --from=build /home/node/app/packages/frontend/dist packages/frontend/dist


WORKDIR packages/backend
RUN npm ci --only=production --ignore-scripts

COPY badgehub-api/packages/backend/process.json .
RUN mkdir -p /home/node/.pm2 /home/node/app/logs /home/node/app/pids && chown -R node:node /home/node/.pm2 /home/node/app/logs

USER node
EXPOSE 8081
CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]
