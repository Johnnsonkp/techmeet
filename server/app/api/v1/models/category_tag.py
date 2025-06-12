from app import db

class CategoryTag(db.Model):
    __tablename__ = 'category_tags'

    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)