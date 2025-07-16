#!/bin/bash
until nc -z db 3306; do
  echo "Waiting for MySQL..."
  sleep 2
done
echo "MySQL is up!"
exec python3 run.py --host=0.0.0.0 --port=5128