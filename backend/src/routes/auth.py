from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import random
import string

# In a real application, use Flask-Mail or a similar library for sending emails
# For now, we'll simulate email sending by printing to console or storing in a temporary way.
# from flask_mail import Message
# from .. import mail # Assuming mail is initialized in __init__.py or main.py

from src.models.user import User, db

auth_bp = Blueprint("auth", __name__)

def generate_verification_code(length=6):
    return "".join(random.choices(string.digits, k=length))

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("fullName")

    if not email or not password or not full_name:
        return jsonify({"error": "Missing required fields (email, password, fullName)"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    hashed_password = generate_password_hash(password)
    verification_code = generate_verification_code()
    
    new_user = User(
        email=email, 
        password_hash=hashed_password, 
        full_name=full_name,
        registration_code=verification_code,
        is_verified=False
    )
    db.session.add(new_user)
    db.session.commit()

    # Simulate sending verification email
    print(f"Simulating email to {email}: Your verification code is {verification_code}")
    # In a real app:
    # msg = Message("Verify Your Email - LINKY NEXUS", recipients=[email])
    # msg.body = f"Your verification code is: {verification_code}"
    # mail.send(msg)

    return jsonify({"message": "User registered successfully. Verification code sent to email.", "userId": new_user.id}), 201

@auth_bp.route("/verify-email", methods=["POST"])
def verify_email():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")

    if not email or not code:
        return jsonify({"error": "Email and code are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.is_verified:
        return jsonify({"message": "Email already verified"}), 200

    if user.registration_code == code:
        user.is_verified = True
        user.registration_code = None  # Clear the code after successful verification
        db.session.commit()
        return jsonify({"message": "Email verified successfully"}), 200
    else:
        return jsonify({"error": "Invalid verification code"}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not user.is_verified:
        # Optionally, resend verification code or prompt for verification
        verification_code = user.registration_code
        if not verification_code: # if code was cleared for some reason but not verified
            verification_code = generate_verification_code()
            user.registration_code = verification_code
            db.session.commit()
        print(f"Simulating email to {email} (login attempt on unverified account): Your verification code is {verification_code}")
        return jsonify({"error": "Email not verified. Please check your email for the verification code."}), 403

    if check_password_hash(user.password_hash, password):
        # In a real app, you would generate a JWT token here and return it
        return jsonify({"message": "Login successful", "userId": user.id, "email": user.email, "fullName": user.full_name}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Placeholder for requesting a new verification code
@auth_bp.route("/resend-verification-code", methods=["POST"])
def resend_verification_code():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.is_verified:
        return jsonify({"message": "Email is already verified"}), 200

    new_code = generate_verification_code()
    user.registration_code = new_code
    db.session.commit()
    
    print(f"Simulating email to {email}: Your new verification code is {new_code}")
    # In a real app:
    # msg = Message("New Verification Code - LINKY NEXUS", recipients=[email])
    # msg.body = f"Your new verification code is: {new_code}"
    # mail.send(msg)

    return jsonify({"message": "New verification code sent to email."}), 200

