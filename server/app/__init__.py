""" Constructor for the 'app' module """
from flask import Flask
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class="config.DevelopmentConfig"):
    """Create an app instance"""
    app = Flask(__name__)
    api = Api(app, version='1.0', title='TechMeet API', description='TechMeet Application API')
    from app.api.v1.routes.oauth_connection import api as oauth_ns
    api.add_namespace(oauth_ns, path='/api/v1/oauth_connection')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    return app