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
from app.api.v1.models.category_tag import CategoryTag
import re
from openai import OpenAI
from flask import jsonify
import os
import json
import re

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

    @staticmethod
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

        # base_dir = os.path.dirname(os.path.abspath(__file__))
        # credentials_path = os.path.normpath(os.path.join(base_dir, '../../../../credentials.json'))

        
        # SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
        SPREADSHEET_ID = '1qvfVzBHoFECGkhV6H4ToDKiSN01nmGogaAAeCEgBIq4'
        TAB_RANGES = [
            'eventbrite-melbourne-technology',
            'meetup-melb-technology',
            'humanitix-melb-technology'
        ]

        credentials_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")

        if not credentials_json:
            raise Exception("GOOGLE_SERVICE_ACCOUNT_JSON env var not set")
        
        creds_dict = json.loads(credentials_json)
        creds = service_account.Credentials.from_service_account_info(creds_dict, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
        # creds = service_account.Credentials.from_service_account_file(credentials_path, scopes=SCOPES)


        all_events = []
        try:
            print("TRY get_all_events_from_sheets google sheets")
            service = build('sheets', 'v4', credentials=creds)
            sheet = service.spreadsheets()
            for tab in TAB_RANGES:
                print("FOR LOOP: get_all_events_from_sheets google sheets")
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

            # random.shuffle(all_events)
            return all_events

        except Exception as e:
            print("not working", e)
            return []


    @staticmethod
    def get_events_from_sheets_to_db():
        print("get_events_from_sheets_to_db")

        # 1. Fetch events from Google Sheets
        events = EventFacade.get_all_events_from_sheets()
        print(f"Fetched {len(events)} events from sheets.")

        # Helper to batch events
        def batch_events(events, batch_size):
            for i in range(0, len(events), batch_size):
                yield events[i:i+batch_size]

        batch_size = 10
        all_category_tag_pairs = []
        all_event_objs = []
        classified_map = {}
        openai_tags_map = {}
        processed_events = []

        try:
            for batch in batch_events(events, batch_size):
                # 2. Generate categories and tags for each event using OpenAI, batched
                classified = EventFacade.create_event_tags_categories(batch)
                if not classified:
                    continue
                # Defensive: Build a mapping from event (name, datetime) to classification
                for event, classification in zip(batch, classified):
                    key = (event.get('name', '').strip(), event.get('datetime', '').strip())
                    classified_map[key] = classification
                    openai_tags_map[key] = classification.get('tags', [])

                category_objs = {}
                tag_objs = {}
                category_tag_pairs = []
                event_objs = []

                print("Processing classified events in batch...")
                for event in batch:
                    key = (event.get('name', '').strip(), event.get('datetime', '').strip())
                    classification = classified_map.get(key)
                    if not classification:
                        print(f"[WARN] No classification for event: {key}")
                        continue
                    event_categories = classification.get("categories", [])
                    event_tags = classification.get("tags", [])

                    # Create/get categories
                    category_ids = []
                    for cat_name in event_categories:
                        cat_name_n = cat_name.strip()
                        if not cat_name_n:
                            continue
                        category = Category.query.filter_by(name=cat_name_n).first()
                        if not category:
                            category = Category(name=cat_name_n)
                            db.session.add(category)
                            db.session.flush()
                        category_objs[cat_name_n] = category
                        category_ids.append(category.id)

                    # Create/get tags
                    tag_ids = []
                    for tag_name in event_tags:
                        tag_name_n = tag_name.strip()
                        if not tag_name_n:
                            continue
                        tag = Tag.query.filter_by(name=tag_name_n).first()
                        if not tag:
                            tag = Tag(name=tag_name_n)
                            db.session.add(tag)
                            db.session.flush()
                        tag_objs[tag_name_n] = tag
                        tag_ids.append(tag.id)

                    # Collect category_tag pairs
                    for cat_id in category_ids:
                        for tag_id in tag_ids:
                            category_tag_pairs.append((cat_id, tag_id))

                    # 4. Create the event and attach tags
                    event_obj = Event(
                        position=event.get('position', ''),
                        name=event.get('name', ''),
                        datetime=event.get('datetime', ''),
                        location=event.get('location', ''),
                        seat_availability=event.get('seat_availability', ''),
                        price=event.get('price', ''),
                        organizer=event.get('organizer', ''),
                        followers=event.get('Followers', ''),
                        event_link=event.get('event_link', ''),
                        image=event.get('image', ''),
                        image_description=event.get('image_description', ''),
                        source_api=event.get('source_api', ''),
                        rating=event.get('rating', ''),
                        attendees_count=event.get('attendees_count', ''),
                        attendee_image_1=event.get('attendee_image_1', ''),
                        attendee_image_2=event.get('attendee_image_2', ''),
                        attendee_image_3=event.get('attendee_image_3', ''),
                        description=event.get('description', ''),
                    )
                    db.session.add(event_obj)
                    db.session.flush()
                    # Attach tags to event
                    for tag_id in tag_ids:
                        tag = Tag.query.get(tag_id)
                        if tag and tag not in event_obj.tags:
                            event_obj.tags.append(tag)
                    event_objs.append(event_obj)
                    processed_events.append(event)

                # 5. Now create category_tag links (avoid duplicates) for this batch
                for category_id, tag_id in category_tag_pairs:
                    exists = db.session.query(CategoryTag).filter_by(category_id=category_id, tag_id=tag_id).first()
                    if not exists:
                        db.session.add(CategoryTag(category_id=category_id, tag_id=tag_id))
                db.session.commit()
                print(f"Batch of {len(batch)} events, categories, tags, and category_tags saved.")
                all_category_tag_pairs.extend(category_tag_pairs)
                all_event_objs.extend(event_objs)
        except Exception as e:
            db.session.rollback()
            print(f"[ERROR] Batch processing failed: {e}")
            return {"error": "Batch processing failed", "details": str(e)}, 500

        # Return all events as a list of dicts for API use
        all_events = Event.query.order_by(Event.id.desc()).all()
        result = []
        for e in all_events:
            key = (e.name.strip() if e.name else '', e.datetime.strip() if e.datetime else '')
            result.append({
                "id": e.id,
                "position": e.position,
                "name": e.name,
                "datetime": e.datetime,
                "location": e.location,
                "seat_availability": e.seat_availability,
                "price": e.price,
                "organizer": e.organizer,
                "followers": e.followers,
                "event_link": e.event_link,
                "image": e.image,
                "image_description": e.image_description,
                "source_api": e.source_api,
                "rating": e.rating,
                "attendees_count": e.attendees_count,
                "attendee_image_1": e.attendee_image_1,
                "attendee_image_2": e.attendee_image_2,
                "attendee_image_3": e.attendee_image_3,
                "description": e.description,
                "tags": [tag.name for tag in e.tags],
                "openai_tags": openai_tags_map.get(key, [])
            })
        return result



    @staticmethod
    def create_event_tags_categories(events):
        prompt = f"""
            You are an expert tech event classifier.

            Your task is to read a list of events, and for each event:
            - Generate a maximum of **2 relevant tech category names**
            - Generate a maximum of **6 tech descriptive tags** based on the event name, description and image description (if available).
            - DO NOT reuse any **category** or **tag** if it has already been assigned to a previous event in the same list.
            - Skip assigning tags/categories to any event that would result in duplicates.

            Return only the events that received **unique tags and categories**, and output them in **structured JSON** format like this:

            [
              {{
                "categories": ["Category 1", "Category 2"],
                "tags": ["tag1", "tag2", ..., "tag6"]
              }},
              ...
            ]

            Each **tag** should be lowercase, descriptive, and no more than 3 words long. Each **category** should be title case (e.g., "Health & Wellness").

            Use only the **event name** and **image description** (if available) to make your decisions.

            Here is the list of events to process:: "{events}"
        """
        
        client = OpenAI(
            # This is the default and can be omitted
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

        response = client.responses.create(
            model="gpt-4o",
            instructions="You are a helpful AI assistant.",
            input=prompt
        )

        try:

            raw_text = response.output[0].content[0].text
            match = re.search(r"```json\n(.*?)\n```", raw_text, re.DOTALL)

            if match:
                json_str = match.group(1)

                print(json_str)
                parsed_data = json.loads(json_str)

                print(parsed_data)

                return parsed_data
                # print(f" {json.loads(response.choices[0].message['content'])}")
                # return json.loads(response.choices[0].message['content'])
        except Exception as e:
            raise ValueError(f"Failed to parse profile JSON: {str(e)}")



    # # -----------------------------
    # #  Get events from Google Sheets and save to DB
    # # -----------------------------
    # @staticmethod
    # def get_events_from_sheets_to_db():
    #     print("get_events_from_sheets_to_db")

    #     # 1. Fetch and cluster events
    #     events = EventFacade.get_all_events_from_sheets()

    #     print(f"AFTER: get_events_from_sheets_to_db")

    #     clustered_events = EventFacade.cluster_events(events, num_clusters=5)

    #     # print(f"clustered_events- {clustered_events}")

    #     # for e in clustered_events:
    #     #     print(f"{e['name']} => {e['category']} — Tags: {e['tags']}")

    #     # 2. Build a mapping of category name to tag names
    #     print("# 2. Build a mapping of category name to tag names-")
    #     category_tag_map = {}
    #     for event_data in clustered_events:
    #         cat = event_data['category']
    #         tags = event_data['tags']
    #         if cat not in category_tag_map:
    #             category_tag_map[cat] = set()
    #         category_tag_map[cat].update(tags)

    #         # print(f"category_tag_map: {category_tag_map}")

    #     print("# 3. Upsert categories and their tags")
    #     # 3. Upsert categories and tags (robust: check if category exists, else add, and only append if not present)
    #     try:
    #         with db.session.no_autoflush:
    #             # 1. Create all categories and tags, store in dicts
    #             category_objs = {}
    #             tag_objs = {}
    #             category_tag_pairs = []

    #             # Create categories and tags, collect pairs
    #             for cat_name, tag_names in category_tag_map.items():
    #                 category_n = cat_name.strip()
    #                 if not category_n or not isinstance(category_n, str):
    #                     print(f"[WARN] Skipping invalid category name: {category_n}")
    #                     continue

    #                 # Get or create category
    #                 category = Category.query.filter_by(name=category_n).first()
    #                 if not category:
    #                     print(f"[INFO] Creating new category: {category_n}")
    #                     category = Category(name=category_n)
    #                     db.session.add(category)
    #                     db.session.flush()
    #                 category_objs[category_n] = category

    #                 for tag_name in tag_names:
    #                     tag_name_s = tag_name.strip()
    #                     if not tag_name_s or not isinstance(tag_name_s, str):
    #                         print(f"[WARN] Skipping invalid tag name: {tag_name_s}")
    #                         continue

    #                     # Get or create tag
    #                     tag = Tag.query.filter_by(name=tag_name_s).first()
    #                     if not tag:
    #                         tag = Tag(name=tag_name_s)
    #                         db.session.add(tag)
    #                         db.session.flush()
    #                     tag_objs[tag_name_s] = tag

    #                     # Store the (category_id, tag_id) pair for later
    #                     category_tag_pairs.append((category.id, tag.id))

    #             # 2. Now create category_tag links (avoid duplicates)
    #             for category_id, tag_id in category_tag_pairs:
    #                 exists = db.session.query(CategoryTag).filter_by(category_id=category_id, tag_id=tag_id).first()
    #                 if not exists:
    #                     db.session.add(CategoryTag(category_id=category_id, tag_id=tag_id))
    #     except Exception as e:
    #         import traceback
    #         print(f"[FATAL ERROR] Exception during category/tag upsert: {e}")
    #         traceback.print_exc()
    #         db.session.rollback()
    #         raise

    #     print("#4. Upsert events and assign tags")
    #     # 4. Upsert events and assign tags
    #     for event_data in clustered_events:
    #         event = Event.query.filter_by(name=event_data['name'], datetime=event_data['datetime']).first()

    #         print(f"#4. Upsert events and assign tags {event}")

    #         if not event:
    #             event = Event(
    #                 position=event_data.get('position', ''),
    #                 name=event_data.get('name', ''),
    #                 datetime=event_data.get('datetime', ''),
    #                 location=event_data.get('location', ''),
    #                 seat_availability=event_data.get('seat_availability', ''),
    #                 price=event_data.get('price', ''),
    #                 organizer=event_data.get('organizer', ''),
    #                 followers=event_data.get('Followers', ''),
    #                 event_link=event_data.get('event_link', ''),
    #                 image=event_data.get('image', ''),
    #                 image_description=event_data.get('image_description', ''),
    #                 source_api=event_data.get('source_api', ''),
    #                 rating=event_data.get('rating', ''),
    #                 attendees_count=event_data.get('attendees_count', ''),
    #                 attendee_image_1=event_data.get('attendee_image_1', ''),
    #                 attendee_image_2=event_data.get('attendee_image_2', ''),
    #                 attendee_image_3=event_data.get('attendee_image_3', ''),
    #                 description=event_data.get('description', ''),
    #             )
    #             db.session.add(event)
    #             db.session.flush()
    #         # Optionally update existing event fields here if needed
    #         # Assign tags to event
    #         for tag_name in event_data['tags']:
    #             tag = Tag.query.filter_by(name=tag_name).first()
    #             if tag and tag not in event.tags:
    #                 event.tags.append(tag)

    #     db.session.commit()

    #     print("return events")
    #     # Return all events as a list of dicts for API use
    #     all_events = Event.query.order_by(Event.id.desc()).all()
    #     result = []
    #     for e in all_events:
    #         result.append({
    #             "id": e.id,
    #             "position": e.position,
    #             "name": e.name,
    #             "datetime": e.datetime,
    #             "location": e.location,
    #             "seat_availability": e.seat_availability,
    #             "price": e.price,
    #             "organizer": e.organizer,
    #             "followers": e.followers,
    #             "event_link": e.event_link,
    #             "image": e.image,
    #             "image_description": e.image_description,
    #             "source_api": e.source_api,
    #             "rating": e.rating,
    #             "attendees_count": e.attendees_count,
    #             "attendee_image_1": e.attendee_image_1,
    #             "attendee_image_2": e.attendee_image_2,
    #             "attendee_image_3": e.attendee_image_3,
    #             "description": e.description,
    #             "tags": [tag.name for tag in e.tags]
    #         })
    #     return result


    # # -----------------------------
    # # Tag Extraction
    # # -----------------------------
    # @staticmethod
    # def extract_tags(text: str, top_n=5) -> List[str]:
    #     keywords = kw_model.extract_keywords(
    #         text,
    #         keyphrase_ngram_range=(1, 2),
    #         stop_words='english',
    #         top_n=top_n
    #     )
    #     return [kw for kw, _ in keywords]


    # # -----------------------------
    # # STEP 2: Preprocess Events
    # # -----------------------------
    # @staticmethod
    # def preprocess_events(events: List[Dict]) -> List[Dict]:
    #     for event in events:
    #         full_text = f"{event['name']}. {event.get('image_description', '')}"
    #         tags = EventFacade.extract_tags(full_text)
    #         event['tags'] = tags
    #         event['tag_string'] = " ".join(tags)
    #     return events


    # # -----------------------------
    # # STEP 3: Generate Embeddings
    # # -----------------------------
    # embedder = SentenceTransformer('all-MiniLM-L6-v2')

    # @staticmethod
    # def generate_embeddings(events: List[Dict]):
    #     tag_texts = [event['tag_string'] for event in events]
    #     return EventFacade.embedder.encode(tag_texts, show_progress_bar=True)


    # # -----------------------------
    # # STEP 4: Cluster Tags using KMeans
    # # -----------------------------
    # @staticmethod
    # def cluster_embeddings(embeddings, num_clusters=5):
    #     kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    #     return kmeans.fit_predict(embeddings)


    # # -----------------------------
    # # STEP 5: Auto-label Cluster Names from Tags
    # # -----------------------------
    # @staticmethod
    # def auto_label_clusters(events: List[Dict], num_clusters: int) -> Dict[int, str]:
    #     cluster_keywords = {i: [] for i in range(num_clusters)}
    #     for event in events:
    #         cluster_id = event['cluster_id']
    #         cluster_keywords[cluster_id].extend(event['tags'])

    #     cluster_labels = {}
    #     for cluster_id, tags in cluster_keywords.items():
    #         if tags:
    #             top_keyword = Counter(tags).most_common(1)[0][0]
    #             label = top_keyword.title()
    #         else:
    #             label = f"Cluster {cluster_id}"
    #         cluster_labels[cluster_id] = label

    #     return cluster_labels


    # # -----------------------------
    # # STEP 6: Label Events with Cluster Info
    # # -----------------------------
    # @staticmethod
    # def label_events(events: List[Dict], labels: List[int], cluster_labels: Dict[int, str]) -> List[Dict]:
    #     for event, cluster_id in zip(events, labels):
    #         event['cluster_id'] = cluster_id
    #         event['category'] = cluster_labels[cluster_id]
    #     return events



    # @staticmethod
    # def normalize(text):
    #     if not text:
    #         return ""
    #     return re.sub(r'\s+', ' ', text.lower().strip())



    # @staticmethod
    # def deduplicate_events(events: List[Dict]) -> List[Dict]:
    #     seen_keys = set()
    #     unique_events = []

    #     for event in events:
    #         # Use a tuple of normalized name and link (or tag string)
    #         name = EventFacade.normalize(event.get("name"))
    #         link = EventFacade.normalize(event.get("event_link"))
    #         key = (name, link)  # Can change to (name,) if link is unreliable

    #         if key not in seen_keys:
    #             seen_keys.add(key)
    #             unique_events.append(event)

    #     return unique_events



    # # -----------------------------
    # # MAIN PIPELINE
    # # -----------------------------
    # @staticmethod
    # def cluster_events(events: List[Dict], num_clusters: int = 5) -> List[Dict]:
    #     events = EventFacade.deduplicate_events(events)
    #     events = EventFacade.preprocess_events(events)
    #     embeddings = EventFacade.generate_embeddings(events)
    #     labels = EventFacade.cluster_embeddings(embeddings, num_clusters)

    #     for i, label in enumerate(labels):
    #         events[i]['cluster_id'] = label

    #     cluster_labels = EventFacade.auto_label_clusters(events, num_clusters)
    #     labeled_events = EventFacade.label_events(events, labels, cluster_labels)

    #     return labeled_events

