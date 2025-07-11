from app import db

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(120))
    skills = db.Column(db.JSON)
    description = db.Column(db.Text)
    personality = db.Column(db.JSON)
    tags = db.Column(db.JSON)

    # One-to-many: 1 profile can belong to many users
    users = db.relationship('User', back_populates='profile', lazy=True)

    @classmethod
    def create_profile(cls, data):
        profile = cls(
            job_title=data.get('job_title'),
            skills=data.get('skills'),
            description=data.get('description'),
            personality=data.get('personality'),
            tags=data.get('tags'),
        )
        return profile