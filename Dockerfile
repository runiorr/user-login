#Create the base OS image
FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .