FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything else
COPY . .

# Make the entrypoint script executable
RUN chmod +x run_deploy.sh

# Expose production port
EXPOSE 8080

# Use entrypoint to switch between dev and prod
CMD ["./run_deploy.sh"]
