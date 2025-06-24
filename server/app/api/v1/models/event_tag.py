from app import db

class EventTag(db.Model):
    __tablename__ = 'event_tags'
    # __tablename__ = 'event_tag'

    # event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)