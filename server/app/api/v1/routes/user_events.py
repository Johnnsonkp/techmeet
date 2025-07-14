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

# get the events of currently logged in user
@api.route("/")
class UserEvents(Resource):
    @jwt_required()
    def get(self):
        """Get all the events registered to currently logged in user, with tags and categories like the post route"""
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(id=current_user_id).first()

        if not user:
            return {"error": "User not found"}, 404

        booked_events = []
        for user_event in user.events:
            event = user_event.event
            # Get tags directly related to the event
            tags = [tag.name for tag in event.tags] if hasattr(event, 'tags') and event.tags else []
            # If no tags, try to infer from title or image_description
            if not tags or len(tags) < 2:
                from app.api.v1.models.tag import Tag
                all_tags = Tag.query.all()
                event_text = f"{getattr(event, 'name', '')} {getattr(event, 'image_description', '')}".lower()

                for tag in all_tags:
                    if tag.name and tag.name.lower() in event_text and tag.name not in tags:
                        tags.append(tag.name)

            booked_events.append({
                "id": event.id if event.id is not None else None,
                "name": event.name if event.name is not None else None,
                "description": event.description if hasattr(event, 'description') else None,
                "price": event.price if event.price is not None else None,
                "location": event.location if event.location is not None else None,
                "seat_availability": event.seat_availability if hasattr(event, 'seat_availability') else None,
                "source_api_id": event.source_api_id if hasattr(event, 'source_api_id') else None,
                "position": event.position if hasattr(event, 'position') else None,
                "datetime": event.datetime if event.datetime is not None else None,
                "organizer": event.organizer if event.organizer is not None else None,
                "followers": event.Followers if hasattr(event, 'Followers') and event.Followers is not None else (event.followers if hasattr(event, 'followers') else None),
                "event_link": event.event_link if event.event_link is not None else None,
                "image": event.image if event.image is not None else None,
                "image_description": event.image_description if event.image_description is not None else None,
                "source_api": event.source_api if event.source_api is not None else None,
                "rating": event.rating if hasattr(event, 'rating') else None,
                "attendees_count": event.attendees_count if hasattr(event, 'attendees_count') else None,
                "attendee_image_1": event.attendee_image_1 if hasattr(event, 'attendee_image_1') else None,
                "attendee_image_2": event.attendee_image_2 if hasattr(event, 'attendee_image_2') else None,
                "attendee_image_3": event.attendee_image_3 if hasattr(event, 'attendee_image_3') else None,
                "tags": tags,
                "categories": [
                    cat.strip()
                    for tag in getattr(event, 'tags', [])
                    for category in getattr(tag, 'categories', [])
                    for cat in category.name.split(",")
                ] if hasattr(event, 'tags') and event.tags else []
            })

        response = {
            "user_id": user.id,
            "first_name": user.first_name,
            "last name": user.last_name,
            "booked_events": booked_events
        }
        return response, 200

# get the events of specific user ( only admin )
@api.route('/<int:user_id>')
class UserEventsList(Resource):
    @api.marshal_with(user_event_model)
    @jwt_required()
    def get(self, user_id):
        """Get all events for a specific user ( only admin )"""
        current_user_id = get_jwt_identity()
        
        # Authorization check
        if current_user_id != user_id:
            return {"error": "Unauthorized access"}, 403
        
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"error": "User not found"}, 404

        events = [{
            'event_id': event.id,
            'name': event.name,
            'description': event.description,
            'price': event.price,
            'location' : event.location,
            'date' : event.date,
            'time' : event.time.isoformat(),
        } for event in user.events]  # using the user.events relationship
        
        response = {
            "user_id": user.user_id,
            "first_name": user.first_name,
            "last name": user.last_name,
            "events": events
        }
        
        return response, 200

# get registered users of the specific event ( admin only )   
@api.route('/<int:event_id>')
#@api.route('/events/<int:event_id>/users')
class EventUsersList(Resource):
    def get(self, event_id):
        """Get all registered users for a specific event ( only admin )"""
        # check if the event_id is in the database
        event = Event.query.filter_by(id=event_id).first()
        if not event:
            return {"error": "Event not found"}, 404
        
        attendees = event.users  # event relationship named 'users'
        
        # Prepare the response data
        response = {
            "event_id": event.event_id,
            "name": event.name,
            "description": event.description,
            "price": event.price,
            "location" : event.location,
            "date" : event.date,
            "time" : event.time.isoformat(),
            "registered_users": [
                {
                    "user_id": attendee.user.user_id,
                    "first_name": attendee.user.first_name,
                    "last_name": attendee.user.last_name,
                    "employment_status": attendee.user.employment_status,
                }
                for attendee in attendees
                if attendee.user  # Ensure the user exists
            ]
        }
        
        return response, 200
    
    @jwt_required()
    def post(self, event_id): 
        """Post/ Add an event to current logged in user"""
        current_user_id = get_jwt_identity()
                        
        user = User.query.filter_by(id=current_user_id).first()
        if not user:
            return {"error": "User not found"}, 404
        
        # check if the event_id is in the database
        event = Event.query.filter_by(id=event_id).first()
        if not event:
             return {"error": f"Event {event_id} not found"}, 404

        # Check if attendance already exists
        if UserEvent.query.filter_by(user_id=current_user_id, event_id=event_id).first():
            return {"error": f"User {current_user_id} already attending event {event_id}"}, 409

        attendee = UserEvent(user_id=current_user_id, event_id=event_id)
        db.session.add(attendee)
        db.session.commit()

        events = Event.query.order_by(Event.id.desc()).all()

        event_dicts = []
        for e in events:
          # Get tags directly related to the event
          tags = [tag.name for tag in e.tags] if hasattr(e, 'tags') and e.tags else []
          # If no tags, try to infer from title or image_description
          if not tags or len(tags) < 2:
              # Get all tags from the database
              from app.api.v1.models.tag import Tag
              all_tags = Tag.query.all()
              event_text = f"{getattr(e, 'name', '')} {getattr(e, 'image_description', '')}".lower()
              for tag in all_tags:
                  if tag.name and tag.name.lower() in event_text and tag.name not in tags:
                      tags.append(tag.name)

        event_dicts.append({
            "id": event.id if event.id is not None else None,
            "name": event.name if event.name is not None else None,
            "description": event.description if hasattr(event, 'description') else None,
            "price": event.price if event.price is not None else None,
            "location": event.location if event.location is not None else None,
            "seat_availability": event.seat_availability if hasattr(event, 'seat_availability') else None,
            "source_api_id": event.source_api_id if hasattr(event, 'source_api_id') else None,
            "position": event.position if hasattr(event, 'position') else None,
            "datetime": event.datetime if event.datetime is not None else None,
            "organizer": event.organizer if event.organizer is not None else None,
            "followers": event.Followers if hasattr(event, 'Followers') and event.Followers is not None else (event.followers if hasattr(event, 'followers') else None),
            "event_link": event.event_link if event.event_link is not None else None,
            "image": event.image if event.image is not None else None,
            "image_description": event.image_description if event.image_description is not None else None,
            "source_api": event.source_api if event.source_api is not None else None,
            "rating": event.rating if hasattr(event, 'rating') else None,
            "attendees_count": event.attendees_count if hasattr(event, 'attendees_count') else None,
            "attendee_image_1": event.attendee_image_1 if hasattr(event, 'attendee_image_1') else None,
            "attendee_image_2": event.attendee_image_2 if hasattr(event, 'attendee_image_2') else None,
            "attendee_image_3": event.attendee_image_3 if hasattr(event, 'attendee_image_3') else None,
            "tags": tags,
            "categories": [
                cat.strip()
                for tag in getattr(attendee, 'tags', [])
                for category in getattr(tag, 'categories', [])
                for cat in category.name.split(",")
            ] if hasattr(attendee, 'tags') and attendee.tags else []
        })

        return {
            "message": "Added successfully",
            "user_id": attendee.user_id,
            "event_id": attendee.event_id,
            "price": event.price,
            "location" : event.location,
            "date" : event.datetime,
            "booked_event": event_dicts
        }, 201
        
    @jwt_required()
    def delete(self, event_id):
        """Delete an event attached to current logged in user"""
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(id=current_user_id).first()
        if not user:
            return {"error": "User not found"}, 404
        
        # check if the event_id is in the database
        event = Event.query.filter_by(id=event_id).first()
        if not event:
             return {"error": f"Event {event_id} not found"}, 404
        
        attendee = UserEvent.query.filter_by(user_id=current_user_id, event_id=event_id).first()

        # search if the event exists and assigned to the current user
        if not attendee:
            return {"error": f"Event {event_id} not found thus can't be deleted, please check the event detail"}, 409

        db.session.delete(attendee)
        db.session.commit()

        return ({   "message" : "Deleted successfully",
                    "event_id" : event_id,
                    "name" : event.name,
                    "description" : event.description,
                    "price": event.price,
                    "location" : event.location,
                    "date" : event.date,
                    "time" : event.time.isoformat(),
        }), 201


    
@api.route('/<int:user_id>/<int:event_id>')
class UserEvents(Resource):
    # Admin accesss only
    # "Add an event to user_events table that a specific user attending"
    def post(self, user_id, event_id):
        """Register user to a specific event ( only admin )"""
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
        event = Event.query.filter_by(id=event_id).first()
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
        """ Delete a specific event which registered to a specific user ( only admin )"""
        
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





