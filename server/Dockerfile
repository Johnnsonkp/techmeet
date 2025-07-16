FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything else
COPY . .

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh wait-for-db.sh

# Expose production port
EXPOSE 5128

# Use entrypoint to switch between dev and prod
CMD ["./wait-for-db.sh"]
