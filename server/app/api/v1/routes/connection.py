from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.api.v1.models.connection import Connection

api = Namespace('connections', description='User connections operations')

connection_model = api.model('Connection', {
    'name': fields.String(required=True, description='Connection name'),
    'email': fields.String(),
    'linkedin': fields.String(),
    'company': fields.String(),
    'company_location': fields.String(),
})

@api.route('/')
class ConnectionsResource(Resource):
    @jwt_required()
    def get(self):
        """Get all connections for the current user"""
        user_id = get_jwt_identity()
        conns = Connection.query.filter_by(user_id=user_id).all()
        return jsonify([conn.name for conn in conns])
    
    @jwt_required()
    @api.marshal_with(connection_model)
    @api.expect(connection_model)
    def post(self):
        """Add a new connection for the current user"""
        data = request.get_json()
        user_id = get_jwt_identity()
        conn = Connection(user_id=user_id, **data)
        db.session.add(conn)
        db.session.commit()
        return jsonify({"message": "Connection added"})