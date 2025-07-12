"""OAuth Connections Model Route"""

from flask_restx import Namespace, Resource
from flask import request, jsonify
import requests
from flask_jwt_extended import create_access_token
from app import db
from app.api.v1.models.user import User
from app.api.v1.models.oauth_connection import OauthConnection
from datetime import datetime
from app.utils.name_parser import extract_names
from app.api.v1.services.user_facade import UserFacade

api = Namespace('oauth_connections', description='OAuth connections operations')

@api.route('/login', methods=['GET', 'POST', 'OPTIONS'])
class Oauth(Resource):
    def get(self):
        """Retrieve all oauth_connections"""
        print("oauth_connections route")

@api.route('/google', methods=['POST'])
class GoogleOAuth(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        token = data.get('access_token')

        if not email or not token:
            return {"error": "Missing required fields"}, 400

        # Validate token with Google
        response = requests.get(f"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={token}")
        if response.status_code != 200:
            return {"error": "Invalid token"}, 401

        token_data = response.json()
        if token_data.get('email') != email:
            return {"error": "Email mismatch"}, 401

        expires_at = datetime.fromtimestamp(int(token_data.get('exp', 0)))

        # Find or create user
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User.register_user(data, is_oauth=True)
            db.session.add(user)

        # Find or create oauth connection
        oauth = OauthConnection.query.filter_by(user_id=user.id, provider="google").first()
        if not oauth:
            oauth = OauthConnection(user_id=user.id, provider="google")
            db.session.add(oauth)

        oauth.access_token = token
        oauth.expires_at = expires_at
        db.session.commit()

        print(f"oauth_user {oauth}")
        print(f"user_facade.to_dict(user) {UserFacade.to_dict(user)}")

        jwt_token = create_access_token(identity=user.id)
        return jsonify({"token": jwt_token, "user": UserFacade.to_dict(user), "provider": "google"})
