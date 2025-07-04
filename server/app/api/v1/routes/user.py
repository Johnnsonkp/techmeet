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
        data = request.get_json()
        email = data.get('email')
        desired_job = data.get('job_title')
        profile_photo_url = data.get('profile_photo_url')

        if User.query.filter_by(email=email).first():
            return {'message': 'Email already exists'}, 400
            
        # Attempt to find an existing profile for the job
        profile = Profile.query.filter_by(job_title=desired_job).first()

        # If no profile exists, create one via OpenAI-powered facade
        if not profile and desired_job:
            job_data = ProfileFacade.create_career_data(desired_job)

            if job_data:
                profile = Profile.create_profile(job_data)
                db.session.add(profile)
                db.session.commit()
            
        # Now create the user and link profile
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

        print(f"login data {data}")

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        

        # if not user or not user.check_password(password):
        if not user or not user.verify_password(password):
            return {'message': 'Invalid email or password'}, 401
        
        print(f" user: {user}")

        jwt_token = create_access_token(identity=str(user.id))
        parsed_user_data = UserFacade.to_dict(user)

        print(f" token: {jwt_token} user: {parsed_user_data}")
        return {"token": jwt_token, "user": parsed_user_data}


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

        print(f" profile: {profile}")

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
        # Update profile fields if present in request
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