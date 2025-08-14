# syntax=docker.io/docker/dockerfile:1@sha256:38387523653efa0039f8e1c89bb74a30504e76ee9f565e25c9a09841f9427b05

# Stage 1: Base image for dependencies and build
FROM node:24.5.0-alpine@sha256:e8e882c692a08878d55ec8ff6c5a4a71b3edca25eda0af4406e2a160d8a93cf2 AS base

# corepack is broken https://github.com/nodejs/corepack/issues/612
# corepack was fixed but is will be removed from node from v25+
# TODO: re-add corepack after it's been removed
# RUN npm install -g corepack@latest

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why gcompat might be needed.
RUN apk add --no-cache gcompat=1.1.0-r4
WORKDIR /app

ENV LEFTHOOK=0

# Copy package manager lock files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable pnpm \
  && pnpm install --frozen-lockfile

# Stage 2: Build stage
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Vite project
RUN corepack enable pnpm \
  && pnpm run build

# Stage 3: Production image
FROM nginx:1.29.1-alpine-slim@sha256:21f4f19c00e9971e264103609e1e1441532aeaf01af2c06b7b360ab9ce9c9eb2 AS runner

# Copy built static files to nginx's default public folder
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/templates/default.conf.template

# implement changes required to run NGINX as an unprivileged user
RUN sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
  && sed -i 's,\(/var\)\{0\,1\}/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf \
  # nginx user must own the cache and etc directory to write cache and tweak the nginx config
  && chown -R nginx /var/cache/nginx \
  && chmod -R g+w /var/cache/nginx \
  && chown -R nginx /etc/nginx \
  && chmod -R g+w /etc/nginx

USER nginx

# ENTRYPOINT [ "20-envsubst-on-templates.sh" ]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
