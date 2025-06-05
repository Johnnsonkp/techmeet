"""Profile Model Route"""

from flask_restx import Namespace, Resource
from app.api.v1.models.profile import Profile
from app import db

api = Namespace('profiles', description='Profile operations')


@api.route('/')
class ProfileList(Resource):
    def get(self):
        """Retrieve all profiles"""
        profiles = Profile.query.all()
        return [
            {
                "id": profile.id,
                "user_id": profile.user_id,
                "job_title": profile.job_title,
                "skills": profile.skills,
                "personality": profile.personality,
                "bio": profile.bio
            } for profile in profiles
        ], 200
