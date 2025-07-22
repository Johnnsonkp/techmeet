from app import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(200), nullable=False)
    # description = db.Column(db.Text)
    # price = db.Column(db.Float)
    # location = db.Column(db.String(200))
    # seat_availability = db.Column(db.Integer)
    # date = db.Column(db.Date)
    # time = db.Column(db.Time)
    
    # source_api_id = db.Column(db.Integer, db.ForeignKey('source_apis.id'))

    # tags = db.relationship('Tag', secondary='event_tags', backref='events')


    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(50))
    description = db.Column(db.Text)
    name = db.Column(db.String(200), nullable=False)
    datetime = db.Column(db.String(100))
    location = db.Column(db.String(200))
    seat_availability = db.Column(db.Integer)
    price = db.Column(db.String(50))
    organizer = db.Column(db.String(200))
    followers = db.Column(db.String(50))
    event_link = db.Column(db.String(500))
    image = db.Column(db.String(500))
    image_description = db.Column(db.Text)
    source_api = db.Column(db.String(100))
    rating = db.Column(db.String(20))
    attendees_count = db.Column(db.String(20))
    attendee_image_1 = db.Column(db.String(500))
    attendee_image_2 = db.Column(db.String(500))
    attendee_image_3 = db.Column(db.String(500))

    source_api_id = db.Column(db.Integer, db.ForeignKey('source_apis.id'))

    tags = db.relationship('Tag', secondary='event_tags', backref='events')


    def to_google_iso8601(self):
        """Convert the event's datetime to Google Calendar's ISO 8601 format"""
        if not self.datetime:
            return None
            
        try:
            # Parse the stored datetime string
            dt = datetime.strptime(self.datetime, '%Y-%m-%d %H:%M:%S')
            
            # Format to ISO 8601 with timezone (Google's preferred format)
            # Example output: "2024-12-25T15:30:00+00:00"
            return dt.isoformat() + 'Z'  # 'Z' indicates UTC timezone
            
        except (ValueError, TypeError):
            return None