from flask_jwt_extended import JWTManager
from app.api.v1.routes.profile import api as profile_ns

jwt = JWTManager()
api.add_namespace(profile_ns, path='/api/v1/profile')