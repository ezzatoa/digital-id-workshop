# Production Dockerfile for Workshop Web Application
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY dist ./dist
COPY server.js ./server.js
COPY portal.html ./portal.html
COPY .env.example ./.env.example

# Create persistent storage directory
RUN mkdir -p /app/data
VOLUME ["/app/data"]

EXPOSE 3001

CMD ["node", "server.js"]


