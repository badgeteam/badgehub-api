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
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/public ./public
COPY --from=build /home/node/app/package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY process.json .
USER node
EXPOSE 8081
CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]
