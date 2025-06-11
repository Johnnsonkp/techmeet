#!/bin/sh

echo "Environment: $FLASK_ENV"

# Run migrations before starting app
echo "Running DB migrations..."
flask db upgrade

if [ "$FLASK_ENV" = "development" ]; then
  echo "Starting Flask development server on port 5328..."
  export FLASK_APP=run.py
  flask run --host='localhost' --port=5328
else
  echo "Starting Gunicorn server on port ${PORT:-8080}..."
  gunicorn run:app --bind 0.0.0.0:${PORT:-8080}
fi
