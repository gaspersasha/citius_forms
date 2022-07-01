# build stage
FROM node:12-stretch
# RUN apk add --no-cache python make g++ # use on different linux build if `apt-get` gives error
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_HOST
RUN apt-get install python3
WORKDIR /build
COPY ./package*.json ./
COPY ./.npmrc ./
RUN npm install --no-optional
COPY ./ ./
RUN npm run lint
RUN npm run test:ci
RUN npm run build

EXPOSE 3000
