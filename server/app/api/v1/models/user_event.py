from app import db

class UserEvent(db.Model):
    __tablename__ = 'user_events'
    # id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)
    # events = db.relationship('Event', backref='user_events') # create user to events link
    user = db.relationship('User', backref='events')  # create event to users link
    event = db.relationship('Event', backref='users')
    # event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    # event_id = db.relationship('Event', backref='attendee')   
    # e.g event1 = Event(name = 'Python Melbourne', description = 'Python fest', price=0.00,
    #  location='MCG', 'seat_availability = 80, date=20/7/2025, time=19:00 )
    # user = db.relationship('User', backref='event_associations')
    # attendee_list= db.relationship('Event', backref='attentee')
    # accessing example event1 = Event(attendee=user.name or user.id)