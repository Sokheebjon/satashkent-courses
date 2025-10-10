# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install Yarn if not included in base image
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies (including devDependencies for building)
RUN yarn install --frozen-lockfile

# Copy source code
COPY apps ./apps
COPY shared ./shared

# Build shared library first
RUN yarn build:shared

# Build admin app
FROM builder AS admin-builder
RUN yarn build:admin

# Build user app
FROM builder AS user-builder
RUN yarn build:user

# Admin production stage
FROM node:20-alpine AS admin

WORKDIR /app

ENV NODE_ENV=production

# Install Yarn
RUN corepack enable

COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy built admin app and shared library
COPY --from=admin-builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/apps/admin/main"]

# User production stage
FROM node:20-alpine AS user

WORKDIR /app

ENV NODE_ENV=production

# Install Yarn
RUN corepack enable

COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy built user app and shared library
COPY --from=user-builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/apps/user/main"]