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
import random
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from collections import Counter
from typing import List, Dict
from app import db
from app.api.v1.models.event import Event
from app.api.v1.models.category import Category
from app.api.v1.models.tag import Tag
# server/credentials.json

kw_model = KeyBERT()

class EventFacade:
    @staticmethod
    def get_events_from_sheet():
        # base_dir = os.path.dirname(os.path.abspath(__file__))
        print("get_events google sheets")
        # Google Sheets API setup
        base_dir = os.path.dirname(os.path.abspath(__file__))
        credentials_path = os.path.normpath(os.path.join(base_dir, '../../../../credentials.json'))

        SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
        SPREADSHEET_ID = '1qvfVzBHoFECGkhV6H4ToDKiSN01nmGogaAAeCEgBIq4'
        RANGE_NAME = 'eventbrite-melbourne-technology'

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

    @staticmethod
    def get_all_events_from_sheets():
        """
        Fetches and combines events from three tabs in the Google Sheet into a single list.
        Handles different possible sheet titles/columns, always returning a consistent event dict.
        """
        print("get_all_events_from_sheets google sheets")
        base_dir = os.path.dirname(os.path.abspath(__file__))
        credentials_path = os.path.normpath(os.path.join(base_dir, '../../../../credentials.json'))
        SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
        SPREADSHEET_ID = '1qvfVzBHoFECGkhV6H4ToDKiSN01nmGogaAAeCEgBIq4'
        TAB_RANGES = [
            'eventbrite-melbourne-technology',
            'meetup-melb-technology',
            'humanitix-melb-technology'
        ]
        creds = service_account.Credentials.from_service_account_file(credentials_path, scopes=SCOPES)
        all_events = []
        try:
            service = build('sheets', 'v4', credentials=creds)
            sheet = service.spreadsheets()
            for tab in TAB_RANGES:
                try:
                    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=tab).execute()
                    values = result.get('values', [])
                    if not values:
                        print(f'No data found in tab: {tab}')
                        continue
                    headers = values[0]
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
                            "image_description": row_dict.get("Image Description", "") or row_dict.get("Image Description or Position", ""),
                            "source_api": row_dict.get("Source_api", ""), 
                            # Additional keys for other possible columns
                            "rating": row_dict.get("Rating", ""),
                            "attendees_count": row_dict.get("Attendees Count", ""),
                            "attendee_image_1": row_dict.get("Attendee Image 1", ""),
                            "attendee_image_2": row_dict.get("Attendee Image 2", ""),
                            "attendee_image_3": row_dict.get("Attendee Image 3", "")
                        }
                        all_events.append(event)
                except Exception as e:
                    print(f"Error reading tab {tab}: {e}")

            random.shuffle(all_events)
            return all_events

        except Exception as e:
            print("not working", e)
            return []


    # -----------------------------
    #  Get events from Google Sheets and save to DB
    # -----------------------------
    @staticmethod
    def get_events_from_sheets_to_db():
        # 1. Fetch and cluster events
        events = EventFacade.get_all_events_from_sheets()
        clustered_events = EventFacade.cluster_events(events, num_clusters=5)

        # 2. Build a mapping of category name to tag names
        category_tag_map = {}
        for event_data in clustered_events:
            cat = event_data['category']
            tags = event_data['tags']
            if cat not in category_tag_map:
                category_tag_map[cat] = set()
            category_tag_map[cat].update(tags)

        # 3. Upsert categories and their tags
        for cat_name, tag_names in category_tag_map.items():
            category = Category.query.filter_by(name=cat_name).first()
            if not category:
                category = Category(name=cat_name)
                db.session.add(category)
                db.session.flush()
            for tag_name in tag_names:
                tag = Tag.query.filter_by(name=tag_name).first()
                if not tag:
                    tag = Tag(name=tag_name)
                    db.session.add(tag)
                    db.session.flush()
                if tag not in category.tags:
                    category.tags.append(tag)

        # 4. Upsert events and assign tags
        for event_data in clustered_events:
            event = Event.query.filter_by(name=event_data['name'], datetime=event_data['datetime']).first()
            if not event:
                event = Event(
                    name=event_data['name'],
                    datetime=event_data['datetime'],
                    description=event_data.get('description', ''),
                    location=event_data.get('location', ''),
                    price=event_data.get('price', ''),
                    # ...add other fields as needed...
                )
                db.session.add(event)
                db.session.flush()
            # Assign tags to event
            for tag_name in event_data['tags']:
                tag = Tag.query.filter_by(name=tag_name).first()
                if tag and tag not in event.tags:
                    event.tags.append(tag)

        db.session.commit()
        return {"message": "Events, categories, and tags imported from Google Sheets."}




    def extract_tags(text: str, top_n=5) -> List[str]:
        keywords = kw_model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words='english',
            top_n=top_n
        )
        return [kw for kw, _ in keywords]


    # -----------------------------
    # STEP 2: Preprocess Events
    # -----------------------------
    def preprocess_events(events: List[Dict]) -> List[Dict]:
        for event in events:
            full_text = f"{event['name']}. {event['description']}"
            tags = extract_tags(full_text)
            event['tags'] = tags
            event['tag_string'] = " ".join(tags)
        return events


    # -----------------------------
    # STEP 3: Generate Embeddings
    # -----------------------------
    embedder = SentenceTransformer('all-MiniLM-L6-v2')

    def generate_embeddings(events: List[Dict]):
        tag_texts = [event['tag_string'] for event in events]
        return embedder.encode(tag_texts, show_progress_bar=True)


    # -----------------------------
    # STEP 4: Cluster Tags using KMeans
    # -----------------------------
    def cluster_embeddings(embeddings, num_clusters=5):
        kmeans = KMeans(n_clusters=num_clusters, random_state=42)
        return kmeans.fit_predict(embeddings)


    # -----------------------------
    # STEP 5: Auto-label Cluster Names from Tags
    # -----------------------------
    def auto_label_clusters(events: List[Dict], num_clusters: int) -> Dict[int, str]:
        cluster_keywords = {i: [] for i in range(num_clusters)}
        
        for event in events:
            cluster_id = event['cluster_id']
            cluster_keywords[cluster_id].extend(event['tags'])

        cluster_labels = {}
        for cluster_id, tags in cluster_keywords.items():
            common = Counter(tags).most_common(2)
            label = ", ".join([kw.title() for kw, _ in common])
            cluster_labels[cluster_id] = label or f"Cluster {cluster_id}"
        
        return cluster_labels


    # -----------------------------
    # STEP 6: Label Events with Cluster Info
    # -----------------------------
    def label_events(events: List[Dict], labels: List[int], cluster_labels: Dict[int, str]) -> List[Dict]:
        for event, cluster_id in zip(events, labels):
            event['cluster_id'] = cluster_id
            event['category'] = cluster_labels[cluster_id]
        return events


    # -----------------------------
    # MAIN PIPELINE
    # -----------------------------
    def cluster_events(events: List[Dict], num_clusters: int = 5) -> List[Dict]:
        events = preprocess_events(events)
        embeddings = generate_embeddings(events)
        labels = cluster_embeddings(embeddings, num_clusters)
        
        for i, label in enumerate(labels):
            events[i]['cluster_id'] = label
        
        cluster_labels = auto_label_clusters(events, num_clusters)
        labeled_events = label_events(events, labels, cluster_labels)
        
        return labeled_events    

      