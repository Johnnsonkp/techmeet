from app import db

class CategoryTag(db.Model):
    __tablename__ = 'category_tag'
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)