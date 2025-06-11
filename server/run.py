
import os
from app import create_app

# Read the config environment variable
config_name = os.getenv("FLASK_CONFIG", "development")

# Create app with appropriate config
app = create_app(config_name)

if __name__ == '__main__':
    # Development server only
    app.run()