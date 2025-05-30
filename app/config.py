import os
from dotenv import load_dotenv

load_dotenv()  # for loading .env configuration

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE=f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}\
      @{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    
class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    # required explicit settung in production
    if not os.getenv('SECRET_KEY'):
        raise RuntimeError("SECRET_KEY Must set in production")

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}