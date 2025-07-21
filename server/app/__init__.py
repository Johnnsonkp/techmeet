import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class BaseConfig:
    """Base configuration."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'insecure-default-key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    JWT_ERROR_MESSAGE_KEY = "message"
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_COOKIE_CSRF_PROTECT = False
    CLOUDINARY_URL = os.getenv('CLOUDINARY_URL')
    CLOUD_NAME = os.getenv('CLOUD_NAME')
    CLOUD_API_KEY = os.getenv('CLOUD_API_KEY')
    CLOUD_API_SECRET = os.getenv('CLOUD_API_SECRET')
    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')
    REDIRECT_URI = os.getenv('REDIRECT_URI')
    REFRESH_TOKEN = os.getenv('TOKEN')

class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///techmeet.db'

class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('MYSQL_URL')

    def __init__(self):
        if not os.getenv('SECRET_KEY'):
            raise RuntimeError("SECRET_KEY must be set in production")
        if not self.SQLALCHEMY_DATABASE_URI:
            raise RuntimeError("MYSQL_URL must be set in production")

class TestingConfig(BaseConfig):
    """Testing configuration."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}