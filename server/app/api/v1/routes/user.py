"""User Model Route"""

from flask_restx import Namespace, Resource, fields
from flask import request
from app.api.v1.models.user import User
from app.api.v1.models.profile import Profile
from app import db
from flask_jwt_extended import create_access_token
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


@api.route('/sign_up', methods=['GET', 'POST', 'OPTIONS'])
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

        jwt_token = create_access_token(identity=new_user.id)
        created_user = UserFacade.to_dict(new_user)

        return {"token": jwt_token, "created_user": created_user}, 201


@api.route('/login', methods=['GET', 'POST', 'OPTIONS'])
@api.expect(user_model)
@api.doc('create_user')
class ExistingUserAuth(Resource):
    def get(self):
        """Creates a user"""
        data = request.get_json()

        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Email already exists'}, 400
        
        print(f"data {data}")

        new_user = User.register_user(data, is_oauth=False)

        db.session.add(new_user)
        db.session.commit()

        return UserFacade.to_dict(new_user)
