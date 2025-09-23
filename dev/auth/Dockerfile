# Use Node.js 20 slim
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY server/package.json server/package-lock.json ./

# Install all dependencies (including dev for TypeScript)
RUN npm install

# Copy the rest of the server code
COPY server ./

# Compile TypeScript
RUN npx tsc

# Set port
ENV PORT=3001
EXPOSE 3001

# Run compiled server
CMD ["node", "dist/index.js"]
