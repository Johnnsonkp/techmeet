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

@api.route('/', methods=['GET', 'POST'])
class ConnectionsResource(Resource):
    @jwt_required()
    def get(self):
        """Get all connections for the current user"""
        user_id = get_jwt_identity()
        conns = Connection.query.filter_by(user_id=user_id).all()
        # Return full connection details as dicts
        return jsonify([conn.to_dict() for conn in conns])
    
    @jwt_required()
    def post(self):
        """Add a new connection for the current user"""
        data = request.get_json()
        print(f"Received data: {data}")  # Debugging line

        user_id = get_jwt_identity()
        conn = Connection(user_id=user_id, **data)
        db.session.add(conn)
        db.session.commit()
        return conn.to_dict(), 201

@api.route('/<int:connection_id>', methods=['PUT', 'DELETE'])
class ConnectionDetailResource(Resource):
    @jwt_required()
    def put(self, connection_id):
        """Update a connection for the current user"""
        user_id = get_jwt_identity()
        conn = Connection.query.filter_by(id=connection_id, user_id=user_id).first()
        if not conn:
            return {"message": "Connection not found"}, 404
        data = request.get_json()
        for key, value in data.items():
            if hasattr(conn, key):
                setattr(conn, key, value)
        db.session.commit()
        return conn.to_dict(), 200

    @jwt_required()
    def delete(self, connection_id):
        """Delete a connection for the current user"""
        user_id = get_jwt_identity()
        conn = Connection.query.filter_by(id=connection_id, user_id=user_id).first()
        if not conn:
            return {"message": "Connection not found"}, 404
        db.session.delete(conn)
        db.session.commit()
        return {"message": "Connection deleted"}, 200