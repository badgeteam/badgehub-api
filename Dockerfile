# Build Stage
FROM node:22-bookworm-slim AS build

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Prod stage
FROM node:22-bookworm-slim

WORKDIR /home/node/app
ENV NODE_ENV=production

# Copy only needed files
COPY  --chown=node:node --from=build /home/node/app/dist ./dist
COPY  --chown=node:node --from=build /home/node/app/public ./public
COPY  --chown=node:node --from=build /home/node/app/package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY process.json .
RUN mkdir -p /home/node/.pm2 /home/node/app/logs /home/node/app/pids && chown -R node:node /home/node/.pm2 /home/node/app/logs

USER node
EXPOSE 8081
CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]
