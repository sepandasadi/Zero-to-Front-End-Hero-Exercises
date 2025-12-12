# Use Node.js 18 Alpine (lightweight)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment variable
ENV NODE_ENV=development

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001

# Copy source code
COPY --chown=reactuser:nodejs . .

# Switch to non-root user
USER reactuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the app
CMD ["npm", "start"]

