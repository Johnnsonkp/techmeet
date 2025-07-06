from openai import OpenAI
from flask import jsonify
import os
import json
import re
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import math
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
# server/credentials.json

class EventFacade:
    @staticmethod
    def get_events_from_sheet():
        print("get_events google sheets")
        # Google Sheets API setup
        base_dir = os.path.dirname(os.path.abspath(__file__))
        credentials_path = os.path.normpath(os.path.join(base_dir, '../../../../credentials.json'))

        SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
        SPREADSHEET_ID = '1qvfVzBHoFECGkhV6H4ToDKiSN01nmGogaAAeCEgBIq4'
        RANGE_NAME = 'eventbrite-melbourne-technology_technology-events-in-melbourne_captured-list_2025-06-10_02-22-42_26c2a550-b1db-4e28-a22f-c63081f57716!A1:J200'

        creds = service_account.Credentials.from_service_account_file(credentials_path, scopes=SCOPES)

        try:
            service = build('sheets', 'v4', credentials=creds)
            sheet = service.spreadsheets()
            result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
            values = result.get('values', [])

            if not values:
                print('No data found in spreadsheet.')
                return []

            headers = values[0]
            events = []
            for row in values[1:]:
                row_dict = {headers[i]: row[i] if i < len(row) else '' for i in range(len(headers))}
                event = {
                    "position": row_dict.get("Position", ""),
                    "name": row_dict.get("Event Name", ""),
                    "datetime": row_dict.get("Event Date & Time", ""),
                    "location": row_dict.get("Event Location", ""),
                    "price": row_dict.get("Price", ""),
                    "organizer": row_dict.get("Organizer", ""),
                    "Followers": row_dict.get("Followers", ""),
                    "event_link": row_dict.get("Event Link", ""),
                    "image": row_dict.get("Event Image", ""),
                    "image_description": row_dict.get("Image Description", "")
                }
                events.append(event)
            return events
        except Exception as e:
            print("not working", e)
            return []

    @staticmethod
    def get_events():
        print("get_events csv")
        # Get the absolute path to the current file (event_facade.py)
        base_dir = os.path.dirname(os.path.abspath(__file__))

        # Build the path to the CSV file
        csv_path = os.path.join(base_dir, '..', 'db', 'eventbrite-2.csv')
        csv_path = os.path.normpath(csv_path)

        # Read the CSV
        try:
            df = pd.read_csv(csv_path)

            # Rename columns for easier access (optional but cleaner)
            df.columns = [
                'position', 'name', 'datetime', 'location', 'price',
                'organizer', 'followers', 'event_link',
                'image', 'image_description'
            ]

            # Parse each row into a dictionary
            events = []
            for _, row in df.iterrows():
                event = {
                    "position": row['position'],
                    "name": row['name'],
                    "datetime": row['datetime'],
                    "location": row['location'],
                    "price": row['price'],
                    "organizer": {
                        "name": row['organizer'] if pd.notna(row['organizer']) else "Unknown",
                        "followers": row['followers'] if pd.notna(row['followers']) else "0"
                    },
                    "event_link": row['event_link'],
                    "image": row['image'],
                    "image_description": row['image_description']
                }
                events.append(event)

            return events

        except FileNotFoundError:
            print(f"CSV file not found at {csv_path}")
            return []
        except Exception as e:
            print(f"Error reading CSV: {e}")
            return []

    def safe_json(data):
        def sanitize(obj):
            if isinstance(obj, dict):
                return {k: sanitize(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [sanitize(v) for v in obj]
            elif isinstance(obj, float) and (math.isnan(obj) or math.isinf(obj)):
                return None
            return obj

        return json.dumps(sanitize(data))

        # google spreadsheet 
        # Define scope
        # scope = [
        #     'https://spreadsheets.google.com/feeds',
        #     'https://www.googleapis.com/auth/drive'
        # ]

        # # Load service account credentials
        # creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
        # client = gspread.authorize(creds)

        # # Open the spreadsheet (first sheet or by name)
        # sheet = client.open("TechMeet Events").sheet1

        # # Read rows as list of dicts
        # raw_events = sheet.get_all_records()

        # # Format each event
        # formatted_events = []
        # for row in raw_events:
        #     event = {
        #         "event_position": row.get("Event Position"),
        #         "name": row.get("Event Name"),
        #         "datetime": row.get("Event Date & Time"),
        #         "location": row.get("Event Location"),
        #         "price": row.get("price"),
        #         "organiser": row.get("Organiser"),
        #         "followers": row.get("followers"),
        #         "event_link": row.get("Event link"),
        #         "image": row.get("event image"),
        #         "description": row.get("Image description")
        #     }
        #     formatted_events.append(event)

        # return formatted_events