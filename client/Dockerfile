# Dockerfile at client/
FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy only frontend code
COPY frontend ./frontend

WORKDIR /app/frontend

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]