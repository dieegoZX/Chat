import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

from src.models.user import db
from src.routes.auth import auth_bp
from src.routes.service import service_bp
from src.routes.ai import ai_bp

# Define the base directory of the Flask app
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(BASE_DIR), 'frontend', 'dist'))
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "a_very_secret_key_that_should_be_in_env_vars_for_production")

CORS(app) # Enable CORS for all routes

# Database Configuration - Changed to SQLite for sandbox compatibility
# The SQLite database file will be created in the instance folder of the backend app
instance_path = os.path.join(os.path.dirname(BASE_DIR), 'instance')
os.makedirs(instance_path, exist_ok=True)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(instance_path, 'linky_nexus.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(service_bp, url_prefix="/api")
app.register_blueprint(ai_bp, url_prefix="/api/ai")

with app.app_context():
    db.create_all()

# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        index_path = os.path.join(app.static_folder, "index.html")
        if os.path.exists(index_path):
            return send_from_directory(app.static_folder, "index.html")
        else:
            return jsonify({"message": "API Backend is running. Frontend index.html not found. Ensure frontend is built and static_folder path is correct."}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

