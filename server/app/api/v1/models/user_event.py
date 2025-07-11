from app import db

class UserEvent(db.Model):
    __tablename__ = 'user_events'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)
    user = db.relationship('User', backref='events')  # create event to users link
    event = db.relationship('Event', backref='users')
