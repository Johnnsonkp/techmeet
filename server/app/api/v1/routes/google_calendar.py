from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.api.v1.models.oauth_connection import OauthConnection
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import Flow
import os

from datetime import datetime, timezone
from dotenv import load_dotenv
from flask import jsonify
import requests
from flask import request

api = Namespace('calendar', description='Google Calendar')

@api.route('/', methods=['POST'])
class CalendarEvents(Resource):
    @jwt_required()
    def post(self):
    
        data = request.get_json()
        # email = data.get('email')
        token = data.get('access_token')
        SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

        def get_calendar_events(creds, time_min=None, time_max=None):
            service = build('calendar', 'v3', credentials=creds)
            # now = datetime.utcnow().isoformat() + 'Z'
            now = datetime.now(timezone.utc).isoformat() 
            if not time_min:
                time_min = now
            events_result = service.events().list(calendarId='primary', timeMin=time_min, timeMax=time_max,
                                                  maxResults=20, singleEvents=True, orderBy='startTime').execute()
            return events_result.get('items', [])

        if token is None:
            return {"error": "Missing required fields"}, 400

        creds = Credentials(
            token=os.getenv('TOKEN'),
            refresh_token=os.getenv('REFRESH_TOKEN'),
            token_uri = "https://oauth2.googleapis.com/token",
            client_id = os.getenv('CLIENT_ID'),
            client_secret = os.getenv('CLIENT_SECRET'),
            scopes=['https://www.googleapis.com/auth/calendar.readonly']
        )

        # View events
        events = get_calendar_events(creds)

        if events:
            print(f"Found {len(events)} events")
            return events, 200


# class CalendarBase(Resource):
    
#     def _get_oauth_connection(self, user_id):
#         return OauthConnection.query.filter_by(
#             user_id=user_id,
#             provider="google"
#         ).first()

#     def _verify_token_active(self, oauth):
#         if oauth.expires_at and oauth.expires_at < datetime.now(timezone.utc):
#             return False
#         return True

#     def _call_google_api(self, oauth, method='GET', endpoint='', params=None, json=None):
#         headers = {
#             'Authorization': f'Bearer {oauth.access_token}',
#             'Accept': 'application/json'
#         }
#         url = f'https://www.googleapis.com/calendar/v3/calendars/primary/{endpoint}'
#         return requests.request(method, url, headers=headers, params=params, json=json)

# @api.route('/')
# class CalendarEvents(CalendarBase):
#     @jwt_required()
#     def get(self):
#         """Get upcoming events"""
#         # data = request.get_json()
#         # token = data.get('access_token')

#         # data = request.get_json()
#         # oauth = self._get_oauth_connection(get_jwt_identity())

#         # data = request.get_json()

#         # print(f"Received data: {data}")  # Debugging line


    
#         # return {"message": "This is a placeholder response for the GET request."}, 200
#         # if not oauth:
#         #     return {"error": "Google connection not found"}, 404
#         # if not self._verify_token_active(oauth):
#         #     return {"error": "Token expired"}, 401

#         # time_now = datetime.now(timezone.utc).isoformat()
#         # params = {
#         #     'maxResults': 10,
#         #     'timeMin': time_now,
#         #     'orderBy': 'startTime',
#         #     'singleEvents': 'true'
#         # }

#         data = request.get_json()
#         token = data.get('access_token')

#         if not token:
#             return {"error": "Missing required fields"}, 400

#         # Validate token with Google
#         response = requests.get(f"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={token}")
#         if response.status_code != 200:
#             return {"error": "Invalid token"}, 401

#         oauth = self._get_oauth_connection(get_jwt_identity())

#         time_now = datetime.now(timezone.utc).isoformat()
#         params = {
#             'maxResults': 10,
#             'timeMin': time_now,
#             'orderBy': 'startTime',
#             'singleEvents': 'true'
#         }

#         try:
#             res = self._call_google_api(oauth, params=params)
#             if res.status_code != 200:
#                 return {"error": res.json().get('error', {}).get('message', 'API error')}, res.status_code
            
#             events = [{
#                 'id': event.get('id'),
#                 'title': event.get('summary', 'No title'),
#                 'start': event.get('start', {}).get('dateTime'),
#                 'end': event.get('end', {}).get('dateTime')
#             } for event in res.json().get('items', [])]
            
#             return jsonify(events)
            
#         except requests.exceptions.RequestException as e:
#             return {"error": f"API connection failed: {str(e)}"}, 500

#     @jwt_required()
#     def post(self):
#         """Create new event"""
#         data = api.payload
#         if not all(k in data for k in ['summary', 'start', 'end']):
#             return {"error": "Missing required fields"}, 400

#         oauth = self._get_oauth_connection(get_jwt_identity())
#         if not oauth:
#             return {"error": "Google connection not found"}, 404
#         if not self._verify_token_active(oauth):
#             return {"error": "Token expired"}, 401

#         event = {
#             'summary': data['summary'],
#             'start': {'dateTime': data['start'], 'timeZone': 'UTC'},
#             'end': {'dateTime': data['end'], 'timeZone': 'UTC'}
#         }
#         if 'description' in data:
#             event['description'] = data['description']

#         try:
#             res = self._call_google_api(oauth, 'POST', 'events', json=event)
#             if res.status_code != 200:
#                 return {"error": res.json().get('error', {}).get('message', 'API error')}, res.status_code
                
#             return jsonify({
#                 'id': res.json().get('id'),
#                 'title': res.json().get('summary'),
#                 'start': res.json().get('start', {}).get('dateTime'),
#                 'end': res.json().get('end', {}).get('dateTime')
#             })
#         except requests.exceptions.RequestException as e:
            
#             return {"error": f"API connection failed: {str(e)}"}, 500


            
        
