""" Constructor for the 'app' module """
from flask import Flask
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
# from app.api.v1.users import api as users_ns
from app.api.v1.routes.oauth_connection import api as oauth_ns
from app.config import config as config_map
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_class="config.DevelopmentConfig"):

  """ method used to create an app instance"""

  app = Flask(__name__)
  app.config.from_object(config_map.get(config_class, config_map['default']))

  api = Api(app, version='1.0', title='HBnB API', description='HBnB Application API')

  # Register the namespaces
  # api.add_namespace(users_ns, path='/api/v1/users')
  api.add_namespace(oauth_ns, path='/api/v1/oauth_connection')

  # Ensure database tables are created before the first request
  # with app.app_context():
      # db.create_all()

  app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Use a strong and unique key in production

   # Initialize the database with the app
  db.init_app(app)
  jwt.init_app(app)
  # jwt = JWTManager(app)

  with app.app_context():
    db.create_all()

  return app