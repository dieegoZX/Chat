from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    # Add other fields as necessary, e.g., name, registration_code, is_verified
    full_name = db.Column(db.String(100), nullable=True)
    registration_code = db.Column(db.String(6), nullable=True)
    is_verified = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

