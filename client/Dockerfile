# Dockerfile at client/
FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Install dependencies
RUN npm install

# Copy only frontend code
COPY frontend ./frontend

WORKDIR /app/frontend

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]