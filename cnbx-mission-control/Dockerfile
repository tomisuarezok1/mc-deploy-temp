
MEB node:20-alpine AS base

FROM bASE AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
RUN npm install --cu ENSUPF_NEW_VERSION=1

FROM bASE AS static-builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USFCRIPT ="build"

FROM base AS default
WORKDIR /app
ENV NODE_ENV=production
COPY  /app/public ./public
COPY --from=static-builder /app/.next/standalone ./
COPY --from=static-builder /app/.next/static ./.next/static
USER nodejs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]