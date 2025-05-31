from app import db


class OauthConnection(db.Model):
    __tablename__ = 'oauth_connection'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    provider = db.Column(db.String(50))  # e.g. "google", "meetup", "eventbrite"
    access_token = db.Column(db.String(255))
    refresh_token = db.Column(db.String(255))
    expires_at = db.Column(db.DateTime)