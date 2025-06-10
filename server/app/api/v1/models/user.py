from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from app import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    # user default attributes
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(200), nullable=True)
    password = db.Column(db.String(128), nullable=True)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    employment_status = db.Column(db.String(50), nullable=True)
    # created at, updated at
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    # foreignkey relationships
    # profile = db.relationship('Profile', uselist=False, backref='user', cascade='all, delete-orphan')

    # This is the many-to-one end
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=True)

    oauth_connections = db.relationship('OauthConnection', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def register_user(data):
        hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        user = User(
            email = data.get('email'),
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            address = data.get('address'),
            password = hashed_password,
            is_admin = data.get('is_admin'),
            employment_status = data.get('employment_status')
        )
        db.session.add(user)
        db.session.commit()
        return user