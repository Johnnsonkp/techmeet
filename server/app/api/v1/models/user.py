from app import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    profile = db.relationship(
        'Profile',
        uselist=False,
        backref='user',
        cascade='all, delete-orphan'
    )

    oauth_connections = db.relationship(
        'OAuthConnection',
        backref='user',
        cascade='all, delete-orphan'
    )
