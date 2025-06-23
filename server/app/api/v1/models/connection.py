from app import db

class Connection(db.Model):
  __tablename__ = 'connections'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  name = db.Column(db.String(120))
  email = db.Column(db.String(120))
  linkedin = db.Column(db.String(120))
  company = db.Column(db.String(120))
  company_location = db.Column(db.String(120))