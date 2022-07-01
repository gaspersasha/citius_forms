# build stage
FROM node:12-stretch AS build
RUN apt-get install python3
WORKDIR /build
COPY ./package*.json ./
COPY ./.npmrc ./
RUN npm install --no-optional
COPY ./ ./
# RUN npm run lint
# RUN npm run test:ci
RUN npm run build
# CMD [ "npm", "run", "dev" ]
