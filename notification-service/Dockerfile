# Build stage
FROM node:22-slim AS builder

WORKDIR /usr/src/app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src/ ./src/

# Runtime stage
FROM node:22-slim

WORKDIR /usr/src/app

# Copy from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY package.json pnpm-lock.yaml ./

# Environment variables
ENV NODE_ENV=production
ENV RESEND_API_KEY=re_ZbgvFb1G_NTbLBGehgBPMdmPTZcgNdJ1D
ENV FROM_EMAIL=orders@creativeinteriorssatna.com
ENV REDIS_URL=rediss://default:AYzpAAIncDI1ODNmMDQ5NThjMWQ0MDViYTBkNmMwY2E5OTk0NjE5NnAyMzYwNzM@informed-piglet-36073.upstash.io:6379

# Start the notification worker
CMD ["node", "src/index.js"]
