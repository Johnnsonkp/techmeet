import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class BaseConfig:
    """Base configuration."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'insecure-default-key')  # Fallback for dev only
    SQLALCHEMY_TRACK_MODIFICATIONS = False

     # Cloudinary-specific variables
    CLOUDINARY_URL = os.getenv('CLOUDINARY_URL')
    CLOUD_NAME = os.getenv('CLOUD_NAME')
    CLOUD_API_KEY = os.getenv('CLOUD_API_KEY')
    CLOUD_API_SECRET = os.getenv('CLOUD_API_SECRET')


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'mysql+pymysql://root:@localhost:3306/techmeet'
    )


class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('MYSQL_URL')

    def __init__(self):
        if not os.getenv('SECRET_KEY'):
            raise RuntimeError("SECRET_KEY must be set in production")
        if not self.SQLALCHEMY_DATABASE_URI:
            raise RuntimeError("MYSQL_URL must be set in production")


# Optional: Add TestingConfig if needed
class TestingConfig(BaseConfig):
    """Testing configuration."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


# Config selector
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
