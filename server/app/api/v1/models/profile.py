from app import db

class Profile(db.Model):
    __tablename__ = 'profile'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    job_title = db.Column(db.String(120))
    skills = db.Column(db.JSON)
    personality = db.Column(db.JSON)
    bio = db.Column(db.Text)
