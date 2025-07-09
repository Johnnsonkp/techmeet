#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Set environment variables for development mode
export FLASK_APP=run.py
export FLASK_ENV=development  # Enables debug mode and auto-reload
export FLASK_DEBUG=1

# Install requirements
pip install -r requirements.txt

# Run migrations before starting app
# echo "Running DB migrations..."
# flask db upgrade

# Run the application
flask run --host='localhost' --port=5328 

echo "✅ Virtual environment setup complete and dependencies installed and app running."