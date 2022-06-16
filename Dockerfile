FROM docker.io/node:18 as builder

WORKDIR /usr/src/track-wear

RUN npm install --location=global pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM docker.io/caddy

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/track-wear/build /usr/share/caddy/frontend

ENV CLIENT_ID=
ENV API_ENDPOINT=
