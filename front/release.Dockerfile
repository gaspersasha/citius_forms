# this isn't actually a tag
ARG TAG=latest
FROM buyacar-siteapp-intermediate-${TAG} as source

FROM node:12-alpine


WORKDIR /usr/src/app
COPY --from=source /build .