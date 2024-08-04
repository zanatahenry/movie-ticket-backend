FROM node:21

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn prisma migrate deploy

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000