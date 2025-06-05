from flask import Flask
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from app.config import config as config_map
import os

load_dotenv()

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class="config.DevelopmentConfig"):
    app = Flask(__name__)
    app.config.from_object(config_map.get(config_class, config_map['default']))
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    api = Api(app, version='1.0', title='TechMeet API', description='TechMeet Application API')
    from app.api.v1.routes.user import api as users_ns
    from app.api.v1.routes.oauth_connection import api as oauth_ns
    from app.api.v1.routes.profile import api as profiles_ns
    api.add_namespace(users_ns, path='/api/v1/users')
    api.add_namespace(oauth_ns, path='/api/v1/oauth_connection')
    api.add_namespace(profiles_ns, path='/api/v1/profiles')
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    from app.api.v1 import models
    with app.app_context():
        db.create_all()
    return app