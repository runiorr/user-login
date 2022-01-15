FROM node:latest

WORKDIR /app

COPY . .

# Install app dependencies

RUN yarn

# Build db container

RUN yarn run build

# Prisma migrations

RUN yarn run prisma


EXPOSE 3000
CMD [ "node", "src/app.js" ] 