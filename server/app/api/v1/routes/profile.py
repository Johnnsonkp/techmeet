"""Profile Model Route"""

from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.api.v1.models.profile import Profile

api = Namespace('profiles', description='Profile operations')

profile_model = api.model("Profile", {
    'job_title': fields.String(required=True),
    'skills': fields.Raw(description='takes skills data as json a object'),
    'personality': fields.Raw(description='takes personality data as json a object'),
    'bio': fields.String(required=True)
})

# @api.route('/profiles')
# class ProfileList(Resource):
#     def get(self):
#         profiles = Profile.query.all()
#         return [
#             {
#                 "id": profile.id,
#                 "user_id": profile.user_id,
#                 "job_title": profile.job_title,
#                 "skills": profile.skills,
#                 "personality": profile.personality,
#                 "bio": profile.bio
#             } for profile in profiles
#         ], 200

@api.route('/')
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
    
    # @api.expect(profile_model)
    # @api.marshal_with(profile_model)
    # @jwt_required()
    def post(self):
        """Create a new profile"""
        user_id = get_jwt_identity()
        data = api.payload
        profile = Profile.query.filter_by(user_id=user_id).first()
        if profile:
            api.abort(400, "Profile already exists")
        profile = Profile(user_id=user_id, job_title=data.get('job_title'), skills=data.get('skills'))
        db.session.add(profile)
        db.session.commit()
        return profile, 201
    
    @api.marshal_with(profile_model)
    @jwt_required()
    def delete(self):
        """Delete a profile"""
        user_id = get_jwt_identity()
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            api.abort(404, "Profile not found")
        db.session.delete(profile)
        db.session.commit()
        return {"message": "Profile deleted"}, 200
