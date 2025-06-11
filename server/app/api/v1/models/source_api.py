from app import db

class SourceAPI(db.Model):
    __tablename__ = 'source_api'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    logo_url = db.Column(db.String(255))
    api_base_url = db.Column(db.String(255))
    description = db.Column(db.Text)
    contact_email = db.Column(db.String(120))
    requires_auth = db.Column(db.Boolean, default=False)
