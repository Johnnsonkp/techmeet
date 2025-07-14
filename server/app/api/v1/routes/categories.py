from flask_restx import Namespace, Resource
from flask import jsonify
from app.api.v1.models.category import Category

api = Namespace('categories', description='Category operations')

@api.route('/', methods=['GET'])
class Tags(Resource):
    def get(self):
        """Get all categories"""
        categories = Category.query.all()
        if not categories:
            return jsonify({"message": "No categories found"}), 200
        # return jsonify([{'id': category.id, 'name': category.name} for category in categories]), 200
    
        response = [{ 'id': category.id, 'name': category.name} for category in categories ]
        return response, 200