from flask import request
from flask import jsonify
from flask_restx import Namespace, Resource, fields
from app import db
from app.api.v1.models.event import Event
from app.api.v1.services.event_facade import EventFacade
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
            events = EventFacade.get_events_from_sheet()
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

