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
import os
from requests.exceptions import RequestException

api = Namespace('oauth_connections', description='OAuth connections operations')

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

@api.route('/google', methods=['POST'])
class GoogleOAuth(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        token = data.get('access_token')

        if not email or not token:
            return {"error": "Missing email or token"}, 400

        try:
            # Improved token validation
            headers = {'Authorization': f'Bearer {token}'}
            response = requests.get(
                'https://www.googleapis.com/oauth2/v1/userinfo',
                headers=headers,
                params={'alt': 'json'}
            )
            response.raise_for_status()
            token_data = response.json()

            # Additional validation
            if token_data.get('email') != email:
                return {"error": "Email mismatch"}, 401
                
            if token_data.get('aud') != GOOGLE_CLIENT_ID:
                return {"error": "Invalid token audience"}, 401

            expires_at = datetime.fromtimestamp(int(token_data.get('exp', 0)))

            # Database operations with transaction
            try:
                with db.session.begin():
                    user = User.query.filter_by(email=email).first()
                    if not user:
                        user_data = {
                            'email': email,
                            'first_name': token_data.get('given_name', ''),
                            'last_name': token_data.get('family_name', '')
                        }
                        user = User.register_user(user_data, is_oauth=True)
                        db.session.add(user)
                        db.session.flush()  # Get the user ID

                    oauth = OauthConnection.query.filter_by(
                        user_id=user.id, 
                        provider="google"
                    ).first()
                    
                    if not oauth:
                        oauth = OauthConnection(
                            user_id=user.id, 
                            provider="google"
                        )
                        db.session.add(oauth)

                    oauth.access_token = token
                    oauth.expires_at = expires_at

                jwt_token = create_access_token(identity=user.id)
                return jsonify({
                    "token": jwt_token,
                    "user": UserFacade.to_dict(user),
                    "provider": "google"
                })

            except Exception as db_error:
                db.session.rollback()
                return {"error": f"Database error: {str(db_error)}"}, 500

        except RequestException as req_error:
            return {"error": f"Google API error: {str(req_error)}"}, 401
        except Exception as e:
            return {"error": f"Unexpected error: {str(e)}"}, 500