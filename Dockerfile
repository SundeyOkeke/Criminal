FROM --platform=linux/amd64 node:18.20-slim

WORKDIR /app

# Install dependencies for Puppeteer
RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    netcat-openbsd \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install pm2 -g

# Copy package.json and install dependencies
COPY package.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install --force

# Copy application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 8080

CMD ["pm2-runtime", "dist/src/main.js"]