FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Install a simple HTTP server
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "8080"]
