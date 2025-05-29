""" Constructor for the 'app' module """
from flask import Flask
from flask_restx import Api
from flask_jwt_extended import JWTManager
# from app.api.v1.users import api as users_ns
import os

def create_app():

  """ method used to create an app instance"""

  # app = Flask(__name__)
  # add static path for css, js and images
  # app = Flask(__name__, static_url_path='/static')
  app = Flask(__name__)

  api = Api(app, version='1.0', title='HBnB API', description='HBnB Application API')

  # Register the namespaces
  api.add_namespace(users_ns, path='/api/v1/users')

  app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Use a strong and unique key in production
  jwt = JWTManager(app)

  return app