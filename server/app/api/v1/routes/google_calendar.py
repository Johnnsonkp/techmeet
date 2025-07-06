from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.api.v1.models.oauth_connection import OauthConnection

from datetime import datetime, timezone
from flask import jsonify
import requests

api = Namespace('calendar', description='Google Calendar')

class CalendarBase(Resource):
    
    def _get_oauth_connection(self, user_id):
        return OauthConnection.query.filter_by(
            user_id=user_id,
            provider="google"
        ).first()

    def _verify_token_active(self, oauth):
        if oauth.expires_at and oauth.expires_at < datetime.now(timezone.utc):
            return False
        return True

    def _call_google_api(self, oauth, method='GET', endpoint='', params=None, json=None):
        headers = {
            'Authorization': f'Bearer {oauth.access_token}',
            'Accept': 'application/json'
        }
        url = f'https://www.googleapis.com/calendar/v3/calendars/primary/{endpoint}'
        return requests.request(method, url, headers=headers, params=params, json=json)

@api.route('/')
class CalendarEvents(CalendarBase):
    @jwt_required()
    def get(self):
        """Get upcoming events"""
        oauth = self._get_oauth_connection(get_jwt_identity())
        if not oauth:
            return {"error": "Google connection not found"}, 404
        if not self._verify_token_active(oauth):
            return {"error": "Token expired"}, 401

        time_now = datetime.now(timezone.utc).isoformat()
        params = {
            'maxResults': 10,
            'timeMin': time_now,
            'orderBy': 'startTime',
            'singleEvents': 'true'
        }

        try:
            res = self._call_google_api(oauth, params=params)
            if res.status_code != 200:
                return {"error": res.json().get('error', {}).get('message', 'API error')}, res.status_code
            
            events = [{
                'id': event.get('id'),
                'title': event.get('summary', 'No title'),
                'start': event.get('start', {}).get('dateTime'),
                'end': event.get('end', {}).get('dateTime')
            } for event in res.json().get('items', [])]
            
            return jsonify(events)
            
        except requests.exceptions.RequestException as e:
            return {"error": f"API connection failed: {str(e)}"}, 500

    @jwt_required()
    def post(self):
        """Create new event"""
        data = api.payload
        if not all(k in data for k in ['summary', 'start', 'end']):
            return {"error": "Missing required fields"}, 400

        oauth = self._get_oauth_connection(get_jwt_identity())
        if not oauth:
            return {"error": "Google connection not found"}, 404
        if not self._verify_token_active(oauth):
            return {"error": "Token expired"}, 401

        event = {
            'summary': data['summary'],
            'start': {'dateTime': data['start'], 'timeZone': 'UTC'},
            'end': {'dateTime': data['end'], 'timeZone': 'UTC'}
        }
        if 'description' in data:
            event['description'] = data['description']

        try:
            res = self._call_google_api(oauth, 'POST', 'events', json=event)
            if res.status_code != 200:
                return {"error": res.json().get('error', {}).get('message', 'API error')}, res.status_code
                
            return jsonify({
                'id': res.json().get('id'),
                'title': res.json().get('summary'),
                'start': res.json().get('start', {}).get('dateTime'),
                'end': res.json().get('end', {}).get('dateTime')
            })
        except requests.exceptions.RequestException as e:
            return {"error": f"API connection failed: {str(e)}"}, 500


    
            
        
