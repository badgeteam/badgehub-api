FROM node:22-bookworm-slim

WORKDIR /home/node/app
ENV NODE_ENV=production

# Copy only needed files
COPY  --chown=node:node ./package*.json .

RUN npm ci --only=production --ignore-scripts

COPY --chown=node:node process.json .

# db-migrate stuff
COPY --chown=node:node migrations ./migrations
COPY --chown=node:node database.json .

# source code
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./tsconfig.json ./tsconfig.json
COPY --chown=node:node ./tsoa.json ./tsoa.json

USER node
EXPOSE 8081
CMD ["node", "--import", "tsx", "src/index.ts"]
