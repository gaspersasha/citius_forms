FROM node:12-stretch
# RUN apk add --no-cache python make g++ # use on different linus build if `apt-get` gives error
RUN apt-get install python3
WORKDIR /build
COPY ./package*.json ./
RUN npm install --no-optional
COPY ./ ./
EXPOSE 3001
