FROM node:alpine

WORKDIR /react-app

COPY ./package.json /react-app
RUN npm install
RUN apk add curl

COPY . /react-app

EXPOSE 8081

RUN npm run build

CMD npm run start