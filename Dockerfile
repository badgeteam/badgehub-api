FROM node:22

WORKDIR /home/node/app
ENV NODE_ENV=production
EXPOSE 8081

COPY process.json .
COPY package*.json .
# When available: COPY --exclude=*.map dist .
COPY dist ./dist
COPY public ./public

RUN npm ci --only=production --ignore-scripts

CMD ["./node_modules/pm2/bin/pm2-runtime", "process.json"]

