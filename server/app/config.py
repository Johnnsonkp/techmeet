# import os
# from dotenv import load_dotenv

# load_dotenv()  # for loading .env configuration

# class Config:
#     SECRET_KEY = os.getenv('SECRET_KEY')
#     SQLALCHEMY_DATABASE_URI = os.environ.get(
#         'DATABASE_URL',
#         'mysql+pymysql://root:@localhost:3306/techmeet'
#     )
#     # SQLALCHEMY_DATABASE=f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}\
#     #   @{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    
# class DevelopmentConfig(Config):
#     DEBUG = True
#     # SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
#     # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://hbnb:hbnb_password@localhost/hbnb_db'
#     # Database Config (Default to MySQL via PyMySQL)
#     # SQLALCHEMY_DATABASE_URI = os.environ.get(
#     #     'DATABASE_URL',
#     #     'mysql+pymysql://root:password@localhost:3306/techmeet'
#     # )

# class ProductionConfig(Config):
#     DEBUG = False
#     # required explicit settung in production
#     if not os.getenv('SECRET_KEY'):
#         raise RuntimeError("SECRET_KEY Must set in production")

# config = {
#     'development': DevelopmentConfig,
#     'production': ProductionConfig,
#     'default': DevelopmentConfig
# }
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class BaseConfig:
    """Base configuration."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'insecure-default-key')  # Fallback for dev only
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'mysql+pymysql://root:@localhost:3306/techmeet'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True


class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False

    def __init__(self):
        if not os.getenv('SECRET_KEY'):
            raise RuntimeError("SECRET_KEY must be set in production")


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
