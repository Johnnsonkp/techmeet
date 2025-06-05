"""User Model Route"""

from flask_restx import Namespace, Resource
from app.api.v1.models.user import User
from app import db

api = Namespace('users', description='User operations')


@api.route('/')
class UserList(Resource):
    def get(self):
        """Retrieve all users"""
        users = User.query.all()
        return [
            {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            } for user in users
        ], 200
