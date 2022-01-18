#FROM postgres
#ENV POSTGRES_PASSWORD password123
#ENV POSTGRES_DB c2dproject


FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .