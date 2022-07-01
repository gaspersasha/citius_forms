#!/usr/bin/env sh

envsubst '${APP_HOST} ${NEXT_PUBLIC_HOST}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g "daemon off;"