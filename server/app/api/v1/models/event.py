from app import db

class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    source = db.Column(db.String(100), nullable=True)

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
    
    # source_api_id = db.Column(db.Integer, db.ForeignKey('source_api.id'))

    tags = db.relationship('Tag', secondary='event_tag', backref='events')

class EventTag(db.Model):
    __tablename__ = 'event_tag'
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)