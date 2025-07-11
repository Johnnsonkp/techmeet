from app import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    tags = db.relationship(
        'Tag',
        secondary='category_tags',
        back_populates='categories',
        collection_class=set
    )