# Builder stage
FROM node:22-slim AS builder

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy prisma schema
COPY prisma/ ./prisma/

# Copy source code (needed for prisma generate to work properly)
COPY src/ ./src/

# Generate Prisma Client with Docker-specific binary target
RUN npx prisma generate --generator client

# Runtime stage
FROM node:22-slim

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/src ./src
COPY package*.json ./

# Environment variables
ENV PORT=6002
ENV NODE_ENV=production
ENV JWT_SECRET=my_super_secret_key_for_hs256_algorithm_which_is_very_secure_12345
ENV DATABASE_URL="postgresql://neondb_owner:npg_M3oRf2aLJklt@ep-lingering-mud-ah1pr615-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
ENV REDIS_URL="rediss://default:AYzpAAIncDI1ODNmMDQ5NThjMWQ0MDViYTBkNmMwY2E5OTk0NjE5NnAyMzYwNzM@informed-piglet-36073.upstash.io:6379"

EXPOSE 6002

CMD ["node", "src/server.js"]
