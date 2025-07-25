from flask import Flask
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from app.config import config as config_map
from flask_migrate import Migrate
from flask_cors import CORS
import cloudinary
import os
import openai
from werkzeug.middleware.proxy_fix import ProxyFix

openai.api_key = os.getenv("OPENAI_API_KEY")
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()

def create_app(config_class=None):
    """ method used to create an app instance"""
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000", "https://techmeet-production.up.railway.app"], supports_credentials=True)

     # Add this line to trust Railway's proxy
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

    cloudinary.config(
      cloud_name = os.getenv('CLOUD_NAME'),
      api_key = os.getenv('CLOUD_API_KEY'),
      api_secret = os.getenv('CLOUD_API_SECRET')
    )

    # Determine config class: from arg > env var > default
    config_name = config_class or os.getenv('FLASK_CONFIG', 'default')
    
    app.config.from_object(config_map.get(config_name, config_map['default']))

    api = Api(app, version='1.0', title='TechMeet API', description='TechMeet Application API')
    
    from app.api.v1.routes.user import api as users_ns
    from app.api.v1.routes.oauth_connection import api as oauth_ns
    from app.api.v1.routes.profile import api as profiles_ns
    from app.api.v1.routes.event import api as events_ns
    from app.api.v1.routes.connection import api as connection_ns
    from app.api.v1.routes.user_events import api as user_events_ns
    from app.api.v1.routes.google_calendar import api as google_calendar_ns
    from app.api.v1.routes.categories import api as categories_ns

    # Register the namespaces
    api.add_namespace(users_ns, path='/api/v1/users')
    api.add_namespace(oauth_ns, path='/api/v1/oauth')
    api.add_namespace(profiles_ns, path='/api/v1/profiles')
    api.add_namespace(events_ns, path='/api/v1/events')
    api.add_namespace(user_events_ns, path='/api/v1/user_events')
    api.add_namespace(connection_ns, path='/api/v1/connections')
    api.add_namespace(google_calendar_ns, path='/api/v1/google_calendar/')
    api.add_namespace(categories_ns, path='/api/v1/categories')

    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Use a strong and unique key in production

    # Initialize the database with the app
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Import models
    from app.api.v1 import models

    # Ensure database tables are created before the first request
    with app.app_context():
        db.create_all()

    return app
