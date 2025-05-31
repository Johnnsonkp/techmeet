FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Build app
# RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "run", "dev"]