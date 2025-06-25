
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

# get the events of specific user
@api.route('/<int:user_id>')
class UserEventsList(Resource):
    # @api.doc(security='Bearer Auth')
    # @api.marshal_list_with(user_event_model)  # for development phase
    @api.marshal_with(user_event_model)
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
    

    
@api.route('/<int:user_id>/<int:event_id>')
class UserEvents(Resource):
    # "Post an event to user_events that a specific user attended"
    def post(self, user_id, event_id):
       
        current_user_id = get_jwt_identity()

        # Authorization check as only the login current user can attached his/her own event
        if current_user_id != user_id:
            return {"error": "Unauthorized access"}, 403
        
        # user = User.query.filter_by(user_id=user_id).first()
        # if not user:
        #     return {"error": "User not found"}, 404
        
        # user_event = UserEvent(user_id=user_id, event_id=event_id)

        # db.session.add(user_event)
        # db.session.commit()

        # return (f'Successfully added\n user_id: {user_event.user_id}\n event_id:{user_event.event_id})                 

       

        # Check if attendance already exists
        if UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first():
            return {"error": "Already attending"}, 409

        attendee = UserEvent(user_id=user_id, event_id=event_id)
        db.session.add(attendee)
        db.session.commit()

        return {
            "message": "Added successfully",
            "user_id": attendee.user_id,
            "event_id": attendee.event_id
        }, 201

    def delete(self, user_id, event_id):
        # delete a specific event which attached to a specific user
        
        current_user_id = get_jwt_identity()
        # Authorization check as only the login current user can attached his/her own event
        if current_user_id != user_id:
            return {"error": "Unauthorized access"}, 403
        attendee = UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first()
        
        # search if the event exists and assigned to the current user
        if not attendee:
        # if not UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first():
            return {"error": "Event not found thus can't be deleted, please check the event detail"}, 409
        db.session.delete(attendee)
        db.session.commit()
        return {
            "message": "Delete successfully",
            "user_id": attendee.user_id,
            "event_id": attendee.event_id
        }, 201
        

        


