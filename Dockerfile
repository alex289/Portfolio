FROM node:alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN yarn install --frozen-lockfile

COPY ./ ./

RUN yarn build

EXPOSE 3000

USER node

CMD [ "yarn", "start" ]