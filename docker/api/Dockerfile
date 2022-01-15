#Create the base OS image
FROM node:latest AS base

#Update the OS ubuntu image
RUN apt-get -y update

#Install packages
RUN apt-get -y install docker

# Install app dependencies
COPY app/package.json .
RUN yarn

COPY app/ ./

# Build db container

RUN docker run --name new-postgres-db -p 5432:5432 -d test_db

# Prisma migrations

RUN prisma migrate dev --schema=./app/src/infra/prisma/schema.prisma


CMD [ "node", "src/app.js" ]  