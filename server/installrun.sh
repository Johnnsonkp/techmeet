#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Set environment variables for development mode
export FLASK_APP=run.py
export FLASK_ENV=development

# Install requirements
pip install -r requirements.txt

# Run migrations
echo "Running DB migrations..."
flask db upgrade

# Run the application
echo "Starting Flask server..."
python run.py

echo "✅ Virtual environment setup complete and dependencies installed and app running."