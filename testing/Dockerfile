FROM hemanthsridhar-docker-lhci-server-center.bintray.io/lhci:4.0

COPY ./package*.json ./
RUN npm install --no-optional
COPY ./ ./

CMD ["sh", "-c", "npm start"]