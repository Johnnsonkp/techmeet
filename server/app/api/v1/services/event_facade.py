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
# server/credentials.json

class EventFacade:
    @staticmethod
    def get_events_from_sheet():
        print(f"get_events_from_sheet");

        sheet_url = "eventbrite-melbourne-technology_technology-events-in-melbourne_captured-list_2025-06-10_02-22-42_26c2a550-b1db-4e28-a22f-c63081f57716"
        # Define the scope
        scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]

        base_dir = os.path.dirname(os.path.abspath(__file__))
        credentials_path = os.path.normpath(os.path.join(base_dir, '../../../credentials.json'))

        # Load credentials and authorize
        creds = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)


        print(f"creds: {creds}")
        client = gspread.authorize(creds)
        

        # Open the spreadsheet by name
        sheet = client.open('eventbrite-2-melbourne-technology').sheet1  # Change to your sheet name

        # Get all records as a list of dicts
        raw_events = sheet.get_all_records()

        print(f"get_events_from_sheet raw_events: {raw_events}");

        # Format each event to match your API structure
        events = []
        for row in raw_events:
            event = {
                "position": row.get("position"),
                "name": row.get("name"),
                "datetime": row.get("datetime"),
                "location": row.get("location"),
                "price": row.get("price"),
                "organizer": {
                    "name": row.get("organizer") or "Unknown",
                    "followers": row.get("followers") or "0"
                },
                "event_link": row.get("event_link"),
                "image": row.get("image"),
                "image_description": row.get("image_description")
            }
            events.append(event)
        return events


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