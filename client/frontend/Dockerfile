# Use Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy the root package.json + lock file to install workspace deps
COPY ../../package.json ../../package-lock.json ./

# Install all workspace dependencies
RUN npm install --legacy-peer-deps

# Copy only the frontend workspace
COPY . .

# Build the frontend app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
