# Dockerfile for Workshop Web Application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package*.json ./
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

