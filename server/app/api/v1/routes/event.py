from flask import request
from flask_restx import Namespace, Resource, fields
from app import db
from app.api.v1.models.event import Event

api = Namespace('events', description='Event operations')

event_model = api.model('Event', {
    'name': fields.String(required=True),
    'location': fields.String(required=True),
    'price': fields.Float(required=True),
    'date': fields.String(required=True), 
})

@api.route('/')
class EventList(Resource):
    @api.marshal_with(event_model)
    @api.doc('list_events') # Unique identifier route in the Swagger/OpenAPI documentation.
    def get(self):
        events = Event.query.all()
        return [{
            "id": e.id, "name": e.name, "location": e.location,
            "price": e.price, "date": str(e.date)
        } for e in events]

    @api.expect(event_model)
    @api.doc('create_event') # Unique identifier route in the Swagger/OpenAPI documentation.
    def post(self):
        data = request.get_json()
        event = Event(**data)
        db.session.add(event)
        db.session.commit()
        return {"message": "Event created", "id": event.id}, 201

