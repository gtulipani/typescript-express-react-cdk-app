FROM node:16-alpine

ENV ADDRESS=0.0.0.0 PORT=8080

WORKDIR /app

COPY . ./

RUN yarn && yarn merge

WORKDIR /app/server

CMD ["node", "dist/index.js"]
