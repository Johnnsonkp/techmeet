
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restx import Namespace, Resource, fields
from app import db
from app.api.v1.models.user_event import UserEvent
from app.api.v1.models.user import User

api = Namespace('user_events', description='User events operations', path='/api/v1/user_events')

# Model for Swagger documentation
user_event_model = api.model('UserEvent', {
    'user_id': fields.Integer(required=True, description='User ID'),
    'event_id': fields.Integer(required=True, description='Event ID')
})

@api.route('/<int:user_id>')
class UserEvents(Resource):
    @api.doc(security='Bearer Auth')
    @api.marshal_list_with(user_event_model)  # for development phase
    @jwt_required()
    def get(self, user_id):
        """Get all events for a specific user"""
        current_user_id = get_jwt_identity()
        
        # Authorization check
        if current_user_id != user_id:
            return {"error": "Unauthorized access"}, 403
        
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            return {"error": "User not found"}, 404

        user_events = UserEvent.query.filter_by(user_id=user_id).all()
        
        return [{
            'user_id': user_event.user_id,
            'event_id': user_event.event_id
        } for user_event in user_events]