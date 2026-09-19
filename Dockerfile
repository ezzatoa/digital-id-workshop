# Production Dockerfile for Digital Identity Workshop (Dokploy & VPS compatible)
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy package descriptors and install only runtime production dependencies
COPY web-app/package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy prebuilt frontend assets and backend server
COPY web-app/dist ./dist
COPY web-app/server.js ./server.js
COPY web-app/portal.html ./portal.html
COPY web-app/.env.example ./.env.example

# Create persistent storage directory
RUN mkdir -p /app/data
VOLUME ["/app/data"]

EXPOSE 3001

CMD ["node", "server.js"]


