from flask_sqlalchemy import SQLAlchemy
from .user import db # Assuming db is already initialized in user.py or a shared models file

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    detailed_page_content = db.Column(db.Text, nullable=True) # For the detailed service page
    icon = db.Column(db.String(50), nullable=True) # e.g., lucide-react icon name
    # Add other fields as necessary, e.g., price, category, images

    def __repr__(self):
        return f'<Service {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'detailed_page_content': self.detailed_page_content,
            'icon': self.icon
        }

