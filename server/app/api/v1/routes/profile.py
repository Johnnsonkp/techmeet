"""Profile Model Route"""

from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.api.v1.models.profile import Profile
from app.api.v1.services.profile_facade import ProfileFacade

api = Namespace('profiles', description='Profile operations')

profile_model = api.model("Profile", {
    'job_title': fields.String(required=True),
    'skills': fields.Raw(description='takes skills data as json a object'),
    'description': fields.String(required=True),
    'personality': fields.Raw(description='takes personality data as json a object'),
    'tags': fields.Raw(description='takes tags data as json a object'),
})

@api.route('/', methods=['GET', 'PUT'])
class ProfileResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        # user = User.query.get(user_id)
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        return jsonify({
            "id": profile.id,
            "job_title": profile.job_title,
            "skills": profile.skills,
            "description": profile.description,
            "personality": profile.personality,
            "tags": profile.tags
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
        profile.description = data.get("description", profile.description)
        profile.personality = data.get("personality", profile.personality)
        profile.tags = data.get("tags", profile.tags)
        db.session.commit()
        return jsonify({"message": "Profile updated"}), 200

    def post(self):
        """Create a new profile"""
        user_id = get_jwt_identity()
        data = api.payload
        profile = Profile.query.filter_by(user_id=user_id).first()
        if profile:
            api.abort(400, "Profile already exists")
        profile = Profile(
            user_id=user_id,
            job_title=data.get('job_title'),
            skills=data.get('skills'),
            description=data.get('description'),
            personality=data.get('personality'),
            tags=data.get('tags')
        )
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
