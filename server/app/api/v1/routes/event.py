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

        # events = EventFacade.get_events()
        # events = EventFacade.get_events_from_sheet()
        # events = EventFacade.get_all_events_from_sheets()
        # events = EventFacade.get_events_from_sheets_to_db()
        """Fetch all events from Google Sheets"""
        try:
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
                  "id": e.id if e.id is not None else None,
                  "name": e.name if e.name is not None else None,
                  "description": e.description if hasattr(e, 'description') else None,
                  "price": e.price if e.price is not None else None,
                  "location": e.location if e.location is not None else None,
                  "seat_availability": e.seat_availability if hasattr(e, 'seat_availability') else None,
                  "source_api_id": e.source_api_id if hasattr(e, 'source_api_id') else None,
                  "position": e.position if hasattr(e, 'position') else None,
                  "datetime": e.datetime if e.datetime is not None else None,
                  "organizer": e.organizer if e.organizer is not None else None,
                  "followers": e.Followers if hasattr(e, 'Followers') and e.Followers is not None else (e.followers if hasattr(e, 'followers') else None),
                  "event_link": e.event_link if e.event_link is not None else None,
                  "image": e.image if e.image is not None else None,
                  "image_description": e.image_description if e.image_description is not None else None,
                  "source_api": e.source_api if e.source_api is not None else None,
                  "rating": e.rating if hasattr(e, 'rating') else None,
                  "attendees_count": e.attendees_count if hasattr(e, 'attendees_count') else None,
                  "attendee_image_1": e.attendee_image_1 if hasattr(e, 'attendee_image_1') else None,
                  "attendee_image_2": e.attendee_image_2 if hasattr(e, 'attendee_image_2') else None,
                  "attendee_image_3": e.attendee_image_3 if hasattr(e, 'attendee_image_3') else None,
                  "tags": tags,
                  "categories": [
                      cat.strip()
                      for tag in getattr(e, 'tags', [])
                      for category in getattr(tag, 'categories', [])
                      for cat in category.name.split(",")
                  ] if hasattr(e, 'tags') and e.tags else []
              })
            
            if(event_dicts):
                import random
                random.shuffle(event_dicts)  # randomise event order in event_dicts
                paginated_events = event_dicts[start:end]
                sanitised_data = EventFacade.safe_json(paginated_events)
                event_json = json.loads(sanitised_data)

                return {
                    "events": event_json,
                    "total": len(event_dicts),
                    "page": page,
                    "limit": limit
                }
            
            # EventFacade.get_events_from_sheets_to_db()

            # Query paginated events from the database
            # events_query = Event.query.order_by(Event.id.desc()).offset(start).limit(limit)
            # events = events_query.all()
            # total = Event.query.count()

            # Serialize events for frontend
            # event_json = [
            #     {
            #         "id": e.id,
            #         "position": e.position,
            #         "name": e.name,
            #         "datetime": e.datetime,
            #         "location": e.location,
            #         "seat_availability": e.seat_availability,
            #         "price": e.price,
            #         "organizer": e.organizer,
            #         "Followers": e.Followers,
            #         "event_link": e.event_link,
            #         "image": e.image,
            #         "image_description": e.image_description,
            #         "source_api": e.source_api,
            #         "rating": e.rating,
            #         "attendees_count": e.attendees_count,
            #         "attendee_image_1": e.attendee_image_1,
            #         "attendee_image_2": e.attendee_image_2,
            #         "attendee_image_3": e.attendee_image_3,
            #         "description": e.description,
            #         "tags": [tag.name for tag in e.tags]
            #     }
            #     for e in events
            # ]

            # return {
            #     "events": event_json,
            #     "total": total,
            #     "page": page,
            #     "limit": limit
            # }
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


@api.route('/upload_events_to_db', methods=['GET'])
class EventUpload(Resource):
    @api.doc('upload_events_to_db')
    def get(self):
        try:
            EventFacade.get_events_from_sheets_to_db()
            print("Events fetched from spreadsheet and stored in db")
            return {"message": "Events fetched from spreadhseet and stored in db"}, 200
        
        except Exception as e:
            return {"message": "Error uploading events to database", "error": str(e)}, 500


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

# get Google ISO 8601  dateTime format of specific event 
@api.route('/<int:event_id>/google_datetime', methods=['GET'])
class EventGoogleDateTime(Resource):
    @api.doc('get_google_datetime',
             responses={
                 200: 'Success',
                 404: 'Event not found',
                 500: 'Internal server error'
             })
    def get(self, event_id):
        """Get Google ISO 8601 formatted datetime for an event"""
        try:
            event = Event.query.get(event_id)
            if not event:
                return {"message": "Event not found"}, 404
            
            google_datetime = event.to_google_iso8601()
            if not google_datetime:
                return {"message": "Event has no valid datetime"}, 400
            
            return {
                "event_id": event_id,
                "google_iso8601_datetime": google_datetime
            }, 200
            
        except Exception as e:
            return {"message": "Error processing request", "error": str(e)}, 500
        
# get all events with formatted ISO 8601 dateTime
@api.route('/with_google_datetime', methods=['GET'])
class EventsWithGoogleDateTime(Resource):
    @api.doc('get_events_with_google_datetime')
    def get(self):
        """Get all events with Google ISO 8601 formatted datetime"""
        try:
            events = Event.query.all()
            result = []
            for event in events:
                result.append({
                    "id": event.id,
                    "title": event.name,
                    "summary": event.description[:100] if event.description else "",
                    "date": event.to_google_iso8601(),  # convert to ISO 8601 
                    "location": event.location,
                    "type": "work"  # Default type or map from your event model
                })
            return {"events": result}, 200
        except Exception as e:
            return {"message": "Error fetching events", "error": str(e)}, 500