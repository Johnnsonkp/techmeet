
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restx import Namespace, Resource, fields
from app import db
from app.api.v1.models.user_event import UserEvent
from app.api.v1.models.user import User
from app.api.v1.models.event import Event

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

        # using UserEvent ( only display event_id)
        # user_events = UserEvent.query.filter_by(user_id=user_id).all()
        
        # return [{
        #     'user_id': user_event.user_id,
        #     'event_id': user_event.event_id
        # } for user_event in user_events]
    
        # using User relationship ( user.events ) to extract event name 
        # events_list = [attendee.event for attendee in user.events]  # user.events is many to many to events object
        
        # return ({   "ID": user.id 
        #             "First name": user.first_name,
        #             "Last name": user.last_name, "Events":
        #             [event_list.name for event_list in events_list]}),201

        events = [{
            'Event ID': event.id,
            'Name': event.name,
            'Description': event.description,
            'Price': event.price,
            'Location' : event.location,
            'Date' : event.date,
            'Time' : event.time.isoformat(),
        } for event in user.events]  # using the user.events relationship
        
        response = {
            "User ID": user.user_id,
            "First name": user.first_name,
            "Last name": user.last_name,
            "Events": events
        }
        
        return response, 200

# get registered users of the specific event    
@api.route('/<int:event_id>')
#@api.route('/events/<int:event_id>/users')
class EventUsersList(Resource):
    def get(self, event_id):
        """Get all registered users for a specific event"""
        # might need to implement admin user check
        # ...
        # check if the event_id is in the database
        event = Event.query.filter(event_id=event_id).first()
        if not event:
            return {"error": "Event not found"}, 404
        
        # users_list = [attendee.user for attendee in event.users]  # backref .users in event

        # return ({   "ID" : event.event_id,
        #             "Event" : event.name,
        #             [user_list.first_name, user_list.last_name for user_list in users_list]
        #             }),201
        
        attendees = event.users  # event relationship named 'users'
        
        # Prepare the response data
        response = {
            "Event ID": event.event_id,
            "Event Name": event.name,
            "Description": event.description,
            "Price": event.price,
            "Location" : event.location,
            "Date" : event.date,
            "Time" : event.time.isoformat(),
            "registered_users": [
                {
                    "User ID": attendee.user.user_id,
                    "First Name": attendee.user.first_name,
                    "Last Name": attendee.user.last_name,
                    "Employment Status": attendee.user.employment_status,
                }
                for attendee in attendees
                if attendee.user  # Ensure the user exists
            ]
        }
        
        return response, 200

    
@api.route('/<int:user_id>/<int:event_id>')
class UserEvents(Resource):
    # "Add an event to user_events table that a specific user attending"
    def post(self, user_id, event_id):
        """Register user to a specific event"""
        current_user_id = get_jwt_identity()

        # Authorization check as only the login current user can attached his/her own event
        if current_user_id != user_id:
            return {"error": "Unauthorized access or User not found"}, 403
        
        # user = User.query.filter_by(user_id=user_id).first()
        # if not user:
        #     return {"error": "User not found"}, 404
        
        # user_event = UserEvent(user_id=user_id, event_id=event_id)

        # db.session.add(user_event)
        # db.session.commit()

        # return (f'Successfully added\n user_id: {user_event.user_id}\n event_id:{user_event.event_id})  
                       
        # check if the event_id is in the database
        event = Event.query.filter_by(event_id=event_id).first()
        if not event:
             return {"error": f"Event {event_id} not found"}, 404
       

        # Check if attendance already exists
        if UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first():
            return {"error": f"User {user_id} already attending event {event_id}"}, 409

        attendee = UserEvent(user_id=user_id, event_id=event_id)
        db.session.add(attendee)
        db.session.commit()

        return {
            "message": "Added successfully",
            "user_id": attendee.user_id,
            "event_id": attendee.event_id
        }, 201

    def delete(self, user_id, event_id):
        """ Delete a specific event which registered to a specific user """
        
        current_user_id = get_jwt_identity()
        # Authorization check as only the login current user can attached his/her own event
        if current_user_id != user_id:
            return {"error": "Unauthorized access"}, 403
        attendee = UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first()
        
        # search if the event exists and assigned to the current user
        if not attendee:
        # if not UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first():
            return {"error": f"Event {event_id} with registered user {user_id} not found thus can't be deleted, please check the event detail"}, 409
        db.session.delete(attendee)
        db.session.commit()
        return {
            "message": "Delete successfully",
            "user_id": attendee.user_id,
            "event_id": attendee.event_id
        }, 201
        

        


