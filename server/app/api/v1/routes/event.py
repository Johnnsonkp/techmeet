from flask import request
from flask import jsonify
from flask_restx import Namespace, Resource, fields
from app import db
from app.api.v1.models.event import Event
from app.api.v1.services.event_facade import EventFacade
from app.api.v1.services.user_facade import UserEventFacade
import math
import json

api = Namespace('events', description='Event operations')

event_model = api.model('Event', {
    'name': fields.String(required=True),
    'location': fields.String(required=True),
    'price': fields.Float(required=True),
    'date': fields.String(required=True), 
})

@api.route('/', methods=['GET', 'POST'])
class EventList(Resource):
    # @api.marshal_with(event_model)
    @api.doc('list_events') # Unique identifier route in the Swagger/OpenAPI documentation.
    def get(self):
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))

        start = (page - 1) * limit
        end = start + limit

        """Fetch all events from Google Sheets"""
        try:
            # events = EventFacade.get_events()
            # events = EventFacade.get_events_from_sheet()
            events = EventFacade.get_all_events_from_sheets()
            # print(f"events: {eventsss}");
            
            if(events):
                paginated_events = events[start:end]
                sanitised_data = EventFacade.safe_json(paginated_events)
                event_json = json.loads(sanitised_data)

                return {
                    "events": event_json,
                    "total": len(events),
                    "page": page,
                    "limit": limit
                }
        except Exception as e:
            return {"message": "Error fetching events", "error": str(e)}, 500
  

    @api.expect(event_model)
    @api.doc('create_event') # Unique identifier route in the Swagger/OpenAPI documentation.
    def post(self):
        data = request.get_json()
        event = Event(**data)
        db.session.add(event)
        db.session.commit()
        return {"message": "Event created", "id": event.id}, 201


@api.route('/search', methods=['GET'])
class EventSearch(Resource):
    @api.doc('search_events')
    def get(self):
        query = request.args.get('q', '').lower()
        try:
            events = EventFacade.get_all_events_from_sheets()
            if not query:
                return {"events": events, "total": len(events)}
            filtered = []
            query_words = query.split()
            for event in events:
                # Combine all searchable fields into a single string
                search_blob = " ".join([
                    str(event.get("name", "")),
                    str(event.get("datetime", "")),
                    str(event.get("location", "")),
                    str(event.get("price", "")),
                    str(event.get("organizer", "")),
                    str(event.get("Followers", "")),
                    str(event.get("event_link", "")),
                    str(event.get("image", "")),
                    str(event.get("image_description", "")),
                    str(event.get("source_api", "")),
                    str(event.get("rating", "")),
                    str(event.get("attendees_count", "")),
                    str(event.get("attendee_image_1", "")),
                    str(event.get("attendee_image_2", "")),
                    str(event.get("attendee_image_3", "")),
                ]).lower()
                if query in search_blob or all(word in search_blob for word in query_words):
                    filtered.append(event)
            return {"events": filtered, "total": len(filtered)}
        except Exception as e:
            return {"message": "Error searching events", "error": str(e)}, 500
        

@api.route('/<int:event_id>/book', methods=['POST'])
class BookEvent(Resource):
    def post(self, event_id):
        user_id = request.json.get('user_id')  # Or get from auth/session
        if not user_id:
            return {"message": "User ID required"}, 400
        success, message = UserEventFacade.book_event(user_id, event_id)
        if success:
            return {"message": message}, 201
        else:
            return {"message": message}, 400