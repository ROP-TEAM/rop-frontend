FROM oven/bun:1.2-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
#  package-lock.json* 
RUN bun install --frozen-lockfile
COPY . .
ARG NEXT_PUBLIC_BACKEND_URL=https://soroutetion.com/api
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
RUN bun run build

FROM alpine:3.19 AS runner
WORKDIR /app

# Next.js standalone requires native Node.js
RUN apk add --no-cache nodejs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a secure, non-root system user for Kubernetes
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy only the optimized standalone production assets from Stage 1
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Switch context to the non-root user for security compliance
USER nextjs

EXPOSE 3000

# Run the server file using standard node, exactly as Next.js intended
CMD ["node", "server.js"]