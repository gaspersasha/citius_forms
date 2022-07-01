FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

COPY ./default.conf /etc/nginx/conf.d/
COPY ./nginx-selfsigned.crt /etc/nginx/conf.d/
COPY ./nginx-selfsigned.key /etc/nginx/conf.d/

EXPOSE 80
EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]
