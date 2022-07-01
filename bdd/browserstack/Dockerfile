FROM node

ARG TARGET_URL

# install chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN apt-get -qqy update
RUN apt-get -qqy install google-chrome-stable

COPY ./package*.json ./
RUN npm install --no-optional
COPY ./ ./

RUN npm run test
