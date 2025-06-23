from flask import Flask, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import db
#from app.api.v1.models.event_history import EventHistory
from app.api.v1.models.user_event import UserEvent
import datetime

app = Flask(__name__)  # assuming this is your main app

# @app.route("/events/<int:event_id>/book", methods=["POST"])
@app.route("/user_events/<int:user_id>", methods= ('GET', 'POST'))
@jwt_required()
def UserEvents(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized access"}), 403
    
    if request.method == 'GET':
        # Get all events for the specified user
        user_events = UserEvent.query.filter_by(user_id=user_id).all()
        
        return jsonify([{
            "event_id": ue.event_id,
      } for ue in user_events])