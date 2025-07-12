from app import db

# class Goal(db.Model):
#     __tablename__ = 'goals'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     title = db.Column(db.String(255), nullable=False)
#     start_date = db.Column(db.Date)
#     due_date = db.Column(db.Date)
#     description = db.Column(db.Text)
#     tags = db.Column(db.JSON)  # List of tags as JSON array
#     connections = db.relationship('Connection', back_populates='goal')
#     user = db.relationship('User', back_populates='goals')

class Connection(db.Model):
    __tablename__ = 'connections'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255))
    company = db.Column(db.String(255))
    job_title = db.Column(db.String(255))
    event_met = db.Column(db.String(255))
    event_date = db.Column(db.String(64))
    notes = db.Column(db.Text)
    tags = db.Column(db.JSON)  # List of tags as JSON array
    linkedin = db.Column(db.String(255))
    github = db.Column(db.String(255))
    goal = db.Column(db.String(255))
    user = db.relationship('User', back_populates='connections')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email,
            'company': self.company,
            'job_title': self.job_title,
            'event_met': self.event_met,
            'event_date': self.event_date,
            'notes': self.notes,
            'tags': self.tags,
            'goal': self.goal,
            'linkedin': self.linkedin,
            'github': self.github,
            # Add other fields as needed
        }