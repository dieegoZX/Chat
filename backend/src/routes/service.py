from flask import Blueprint, request, jsonify
from src.models.service import Service, db

service_bp = Blueprint("service", __name__)

# Create a new service
@service_bp.route("/services", methods=["POST"])
def create_service():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    detailed_page_content = data.get("detailed_page_content")
    icon = data.get("icon")

    if not name or not description:
        return jsonify({"error": "Name and description are required"}), 400

    if Service.query.filter_by(name=name).first():
        return jsonify({"error": "Service with this name already exists"}), 409

    new_service = Service(
        name=name,
        description=description,
        detailed_page_content=detailed_page_content,
        icon=icon
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify(new_service.to_dict()), 201

# Get all services
@service_bp.route("/services", methods=["GET"])
def get_services():
    services = Service.query.all()
    return jsonify([service.to_dict() for service in services]), 200

# Get a single service by ID
@service_bp.route("/services/<int:service_id>", methods=["GET"])
def get_service(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"error": "Service not found"}), 404
    return jsonify(service.to_dict()), 200

# Update a service by ID
@service_bp.route("/services/<int:service_id>", methods=["PUT"])
def update_service(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    data = request.get_json()
    service.name = data.get("name", service.name)
    service.description = data.get("description", service.description)
    service.detailed_page_content = data.get("detailed_page_content", service.detailed_page_content)
    service.icon = data.get("icon", service.icon)

    db.session.commit()
    return jsonify(service.to_dict()), 200

# Delete a service by ID
@service_bp.route("/services/<int:service_id>", methods=["DELETE"])
def delete_service(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    db.session.delete(service)
    db.session.commit()
    return jsonify({"message": "Service deleted successfully"}), 200

