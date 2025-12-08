FROM node:24.11.1-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run start"]
