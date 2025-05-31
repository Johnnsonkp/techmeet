FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 5328

# Run Flask app
CMD ["python3", "run.py", "--host=0.0.0.0", "--port=5328"]

