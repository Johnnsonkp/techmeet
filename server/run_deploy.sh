#!/bin/sh

echo "Environment: $FLASK_ENV"

# Run migrations before starting app
echo "Running DB migrations..."
flask db upgrade

echo "Starting Gunicorn server on port ${PORT:-8080}..."
gunicorn run:app --bind 0.0.0.0:${PORT:-8080}
