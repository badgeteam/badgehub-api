FROM node:22-bookworm-slim

WORKDIR /home/node/app
ENV NODE_ENV=production

# Copy only needed files
COPY  --chown=node:node ./package*.json .

RUN npm ci --only=production --ignore-scripts

COPY --chown=node:node process.json .
RUN mkdir -p /home/node/.pm2 /home/node/app/logs /home/node/app/pids && chown -R node:node /home/node/.pm2 /home/node/app/logs

# db-migrate stuff
COPY --chown=node:node migrations ./migrations
COPY --chown=node:node database.json .

COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src

USER node
EXPOSE 8081
CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]
