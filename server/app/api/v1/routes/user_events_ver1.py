from flask import Flask, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import db
#from app.api.v1.models.event_history import EventHistory
from app.api.v1.models.user_event import UserEvent
from flask_restx import Namespace, Resource, fields
from app.api.v1.models.user import User

# app = Flask(__name__)  # assuming this is your main app

api = Namespace('user_events', description='List of events attended')

# Model for Swagger documentation
user_event_model = api.model('UserEvent', {
    'user_id': fields.Integer(required=True, description='User ID'),
    'event_id': fields.Integer(required=True, description='Event ID')
})


# @app.route("/events/<int:event_id>/book", methods=["POST"])
@api.route("/<int:user_id>", methods= ('GET'))
# @app.route("/", methods= ('GET', 'POST'))
@jwt_required()
# def UserEvents(user_id):
def UserEvents(Resource):
    # current_user_id = get_jwt_identity()
    # if current_user_id != user_id:
    #     return jsonify({"error": "Unauthorized access"}), 403
    
   

    @jwt_required()
    def get(self, user_id):
        
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        # user_events = UserEvent.query.all()
        user_events = UserEvent.fiter_by(user_id=user_id).first()

        return jsonify([{
            'user_id': user_event.user_id,
            'event_id': user_event.event_id
        } for user_event in user_events
        ]) 


    # if request.method == 'GET':
    #     # Get all events for the specified user
    #     user_events = UserEvent.query.filter_by(user_id=user_id).all()
        
    #     return jsonify([{
    #         "event_id": user_event.event_id,
    #   } for user_event in user_events])