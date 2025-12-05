FROM node:24.11.1-alpine as builder

WORKDIR /app

COPY . ./

RUN npm ci --only=production

EXPOSE 3333

CMD ['node', 'src/server.ts']