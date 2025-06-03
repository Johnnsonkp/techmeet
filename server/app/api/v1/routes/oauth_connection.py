"""OAuth Connections Model Route"""

from flask_restx import Namespace, Resource
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app import db
from app.api.v1.models.user import User
from app.api.v1.models.oauth_connection import OauthConnection
import requests

api = Namespace('oauth_connection', description='OAuth connections operations')

@api.route('/login', methods=['GET', 'POST', 'OPTIONS'])
class Oauth(Resource):
    def get(self):
        """Retrieve all oauth_connections"""
        print("oauth_connections route")

@api.route('/google', methods=['POST'])
class GoogleOAuth(Resource):
   @api.route('/google', methods=['POST'])
class GoogleOAuth(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        token = data.get('access_token')
        # Validate token
        response = requests.get(f"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={token}")
        if response.status_code != 200:
            return {"error": "Invalid token"}, 401
        token_data = response.json()
        if token_data.get('email') != email:
            return {"error": "Email mismatch"}, 401
        # Query or create User
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(email=email, password=None)
            db.session.add(user)
            db.session.commit()
        # Create OauthConnection
        oauth = OauthConnection(user_id=user.id, provider="google", access_token=token)
        db.session.add(oauth)
        db.session.commit()
        # Generate JWT
        jwt_token = create_access_token(identity=user.id)
        return jsonify({"token": jwt_token}), 200
