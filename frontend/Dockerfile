# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose port 80
EXPOSE 80

# Set environment variables
ENV PORT=80
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"] 