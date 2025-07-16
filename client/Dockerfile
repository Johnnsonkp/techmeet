# Dockerfile at client/
FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy only frontend code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]