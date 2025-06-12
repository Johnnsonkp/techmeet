from flask_restx import Namespace, Resource
from flask import jsonify
from app.api.v1.models.event import Tag

api = Namespace('tags', description='Tag operations')

@api.route('/tags', methods=['GET'])
class Tags(Resource):
    def get(self):
        # Query all tags
        tags = Tag.query.all()
        # Return JSON list of tags
        if not tags:
            return jsonify({"message": "No tags found"}), 200
        return jsonify([{'id': tag.id, 'name': tag.name, 'source': tag.source} for tag in tags]), 200
    
    