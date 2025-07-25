from app import db

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    source = db.Column(db.String(100))
    categories = db.relationship(
        'Category',
        secondary='category_tags',
        back_populates='tags',
        collection_class=set
    )