"""User Model Route"""

from flask_restx import Namespace, Resource, fields
from flask import request
import requests
from app.api.v1.models.user import User
from app.api.v1.models.profile import Profile
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.api.v1.services.user_facade import UserFacade
from app.api.v1.services.profile_facade import ProfileFacade
from datetime import datetime
from app.api.v1.models.connection import Connection
from app.api.v1.models.user_event import UserEvent
from google.oauth2 import id_token
from google.auth.transport.requests import Request

api = Namespace('users', description='User operations')

user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email address'),
    'password': fields.String(required=True, description='User password'),
    'job_title': fields.String(required=True, description='Job title'),
    'employment_status': fields.String(required=True, description='Employment status'),
    'technical_skills': fields.List(fields.String, required=True, description='List of technical skills'),
    'bio': fields.String(required=False, description='Short biography'),
    'profile_photo_url': fields.String(required=False, description='Profile photo URL (Cloudinary or other)'),
})

user_login_model = api.model('User', {
    'email': fields.String(required=True),
    'password': fields.String(required=True),
})

google_login_model = api.model('GoogleLogin', {
    'id_token': fields.String(required=True, description='Google ID token'),
})

@api.route('/', methods=['GET', 'POST', 'OPTIONS'])
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

@api.route('/sign_up', methods=['GET', 'POST'])
@api.expect(user_model)
@api.doc('create_user')
class NewUserAuth(Resource):
    def post(self):
        """Creates a new user"""
        if request.content_type and request.content_type.startswith('multipart/form-data'):
            data = request.form.to_dict()
            image = request.files.get('profile_photo_url')
        else:
            data = request.get_json()
            image = None
        if 'is_admin' in data:
            if isinstance(data['is_admin'], str):
                data['is_admin'] = data['is_admin'].lower() == 'true'
        email = data.get('email')
        desired_job = data.get('job_title')
        profile_photo_url = data.get('profile_photo_url')

        if User.query.filter_by(email=email).first():
            return {'message': 'Email already exists'}, 400
        
        profile = Profile.query.filter_by(job_title=desired_job).first()

        if not profile and desired_job:
            job_data = ProfileFacade.create_career_data(desired_job)
            if job_data:
                profile = Profile.create_profile(job_data)
                db.session.add(profile)
                db.session.commit()

        img_url = None
        if image:
            public_id = str(email) + str(datetime.now())
            img_url = UserFacade.cloudinary_img_upload(image, public_id)
            data['profile_photo_url'] = img_url

        new_user = User.register_user(data, is_oauth=False)
        if profile:
            new_user.profile_id = profile.id
        db.session.add(new_user)
        db.session.commit()

        jwt_token = create_access_token(identity=str(new_user.id))
        created_user = UserFacade.to_dict(new_user)

        return {"token": jwt_token, "user": created_user}, 201

@api.route('/login', methods=['GET', 'POST'])
@api.expect(user_login_model)
@api.doc('sign_in')
class ExistingUserAuth(Resource):
    def post(self):
        """Authenticate a user by email and password"""
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        
        if not user or not user.verify_password(password):
            return {'message': 'Invalid email or password'}, 401

        jwt_token = create_access_token(identity=str(user.id))
        parsed_user_data = UserFacade.to_dict(user)

        return {"token": jwt_token, "user": parsed_user_data}

@api.route('/google-login', methods=['POST'])
@api.expect(google_login_model)
@api.doc('google_sign_in')
class GoogleLogin(Resource):
    def post(self):
        """Authenticate a user with Google ID token"""
        data = request.get_json()
        id_token_str = data.get('id_token')
        client_id = 'YOUR_CLIENT_ID.apps.googleusercontent.com'  # Replace with your Google Client ID
        try:
            idinfo = id_token.verify_oauth2_token(id_token_str, Request(), client_id)
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            user = User.query.filter_by(email=email).first()
            if not user:
                # Create new user
                user_data = {
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'password': '',  # No password for OAuth users
                    'job_title': '',
                    'employment_status': '',
                    'technical_skills': [],
                    'is_oauth': True,
                }
                user = User.register_user(user_data, is_oauth=True)
                db.session.add(user)
                db.session.commit()

            jwt_token = create_access_token(identity=str(user.id))
            parsed_user_data = UserFacade.to_dict(user)
            return {"token": jwt_token, "user": parsed_user_data}, 200
        except ValueError as e:
            return {'message': f'Invalid Google token: {str(e)}'}, 401

@api.route('/profile', methods=['GET', 'PUT'])
class UserProfileResource(Resource):
    @jwt_required()
    def get(self):
        """Get the profile of the currently authenticated user"""
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        if not user.profile:
            return {'message': 'Profile not found'}, 404
        profile = user.profile

        return {
            'id': profile.id,
            'job_title': profile.job_title,
            'skills': profile.skills,
            'description': profile.description,
            'personality': profile.personality,
            'tags': profile.tags,
        }, 200

    @jwt_required()
    def put(self):
        """Edit user profile"""
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        if not user.profile:
            return {'message': 'Profile not found'}, 404
        profile = user.profile

        data = request.get_json()
        if 'job_title' in data:
            profile.job_title = data['job_title']
        if 'skills' in data:
            profile.skills = data['skills']
        if 'description' in data:
            profile.description = data['description']
        if 'personality' in data:
            profile.personality = data['personality']
        if 'tags' in data:
            profile.tags = data['tags']

        db.session.commit()

        return {
            'id': profile.id,
            'job_title': profile.job_title,
            'skills': profile.skills,
            'description': profile.description,
            'personality': profile.personality,
            'tags': profile.tags,
        }, 200

@api.route('/stats', methods=['GET', 'PUT'])
class UserStats(Resource):
    @jwt_required()
    def get(self):
        """Get the stats of the currently authenticated user"""
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        connections_count = Connection.query.filter(
            ((Connection.user_id == user_id))
        ).count()

        events_attended_count = UserEvent.query.filter_by(user_id=user_id).count()

        upcoming_events_count = 0
        active_goals_count = 0

        return {
            'connections_count': connections_count,
            'events_attended_count': events_attended_count,
            'upcoming_events_count': upcoming_events_count,
            'active_goals_count': active_goals_count,
        }, 200