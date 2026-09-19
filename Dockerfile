# Multi-stage Dockerfile for Digital Identity Workshop (Dokploy & VPS compatible)
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY web-app/package*.json ./
RUN npm ci

# Copy source files and build
COPY web-app/ ./
RUN npm run build

# Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY web-app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/.env.example ./.env.example

# Create persistent storage directory
RUN mkdir -p /app/data

# Declare volume for permanent storage
VOLUME ["/app/data"]

EXPOSE 3001

CMD ["node", "server.js"]

