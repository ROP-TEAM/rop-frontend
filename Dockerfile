FROM oven/bun:1.2-alpine AS builder
WORKDIR /app
COPY package.json bun.lock* package-lock.json* ./
#  package-lock.json* 
RUN bun install --frozen-lockfile \
    --trusted-dependency sharp \
    --trusted-dependency @parcel/watcher
COPY . .
ARG NEXT_PUBLIC_BACKEND_URL=https://soroutetion.com/api
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
RUN bun run build

FROM oven/bun:1-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", "run", "server.js"]