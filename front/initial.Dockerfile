# smallest possible node image
FROM alpine:3.11

# we trust alpine devs to use stable nodejs (12.15) and npm (6.13) versions
RUN apk add --update nodejs npm

## add `python` for `node-gyp`
RUN apk add --no-cache python make g++

# add `node` user, as in `node:alpine` image
RUN addgroup -S node && adduser -S node -G node

# set user not to be root, but preperade by node image
# every comand runs under this user
USER node

# set directory not in root
# create dir first, instead of simply workdir - to avoid issues with `npm install`
RUN mkdir /home/node/citius
WORKDIR /home/node/citius

# set directory for npm global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# add [production process manager with load balancer](https://www.npmjs.com/package/pm2)
RUN npm install --global --no-optional pm2

# copy `package*` as a separate step to benefit from docker cache layers
COPY --chown=node:node ./package*.json ./

# RUN npm install
# `ci` is more strict `install`, that should be used for production
RUN npm ci --no-optional

# copy repository base (except for .dockerignore)
COPY --chown=node:node ./ ./

# pre build checks (move to jenkins, make as a external step?)
RUN npm run lint
RUN npm run test:ci

# let nextjs build assets
RUN npm run build

# port on this container
EXPOSE 3000

# run nextjs server throu pm2
CMD [ "pm2-runtime", "npm", "--", "start" ]
