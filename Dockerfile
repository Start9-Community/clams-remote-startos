FROM node:20-bookworm-slim AS build

RUN \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app
COPY clams-remote /app

RUN \
    rm -f /app/.git && \
    yarn install --frozen-lockfile && \
    yarn build

FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
