from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from app import db, bcrypt
from app.utils.name_parser import extract_names


class User(db.Model):
    __tablename__ = 'users'

    # user default attributes
    id = db.Column(db.Integer, primary_key=True)

    # Required fields
    first_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # Optional fields
    last_name = db.Column(db.String(50), nullable=True)
    password = db.Column(db.String(128), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    address = db.Column(db.String(200), nullable=True)
    profile_photo_url = db.Column(db.String(255), nullable=True)
    job_title = db.Column(db.String(100), nullable=True)
    employment_status = db.Column(db.String(50), nullable=True)

    # Flags
    is_admin = db.Column(db.Boolean, default=False, nullable=False)

    # Skills as JSON array
    technical_skills = db.Column(db.JSON, nullable=True) 

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # foreignkey relationships
    # This is the many-to-one end
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=True)
    oauth_connections = db.relationship('OauthConnection', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    @classmethod
    def register_user(cls, data, is_oauth=False):
        password = data.get('password')
        hashed_password = (
            bcrypt.generate_password_hash(password).decode('utf-8') if password else None
        )

        # Fallback for OAuth name parsing
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        if is_oauth and not first_name and not last_name:
            full_name = data.get('name')
            first_name, last_name = extract_names(full_name)

        user = cls(
            first_name=first_name,
            last_name=last_name,
            email=data.get('email'),
            password=hashed_password,
            bio=data.get('bio'),
            profile_photo_url=data.get('profile_photo_url'),
            job_title=data['job_title'],
            address=data.get('address'),
            is_admin=data.get('is_admin', False),
            employment_status=data.get('employment_status'),
            technical_skills=data['technical_skills'],
        )

        return user