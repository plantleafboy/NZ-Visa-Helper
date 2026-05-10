FROM node:16-alpine 
# FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 3000