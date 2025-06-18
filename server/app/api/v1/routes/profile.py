"""Profile Model Route"""

from flask_restx import Namespace, Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.api.v1.models.profile import Profile

api = Namespace('profile', description='Profile operations')

@api.route('/profiles')
class ProfileList(Resource):
    def get(self):
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

@api.route('/profile')
class ProfileResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        return jsonify({
            "id": profile.id,
            "user_id": profile.user_id,
            "job_title": profile.job_title,
            "skills": profile.skills,
            "personality": profile.personality,
            "bio": profile.bio
        }), 200

    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        profile.job_title = data.get("job_title", profile.job_title)
        profile.skills = data.get("skills", profile.skills)
        profile.personality = data.get("personality", profile.personality)
        profile.bio = data.get("bio", profile.bio)
        db.session.commit()
        return jsonify({"message": "Profile updated"}), 200
