#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run the application
python run.py

echo "✅ Virtual environment setup complete and dependencies installed and app running."