from app import db
from app.models.tag import Tag  # Ensure Tag is imported
from app.models.event_tag import EventTag  # Import the join model

class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float)
    location = db.Column(db.String(200))
    seat_availability = db.Column(db.Integer)
    date = db.Column(db.Date)
    time = db.Column(db.Time)

    source_api_id = db.Column(db.Integer, db.ForeignKey('source_api.id'))

    tags = db.relationship('Tag', secondary='event_tag', backref='events')