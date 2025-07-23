from app import db   # temporary disable for standalone testing
from datetime import datetime

# # db for standalone testing , to remove if part techmeet server 
# try:
#     from app import db
# except ImportError:
#     # Create a simple mock for testing
#     # from datetime import datetime
#     # db = type('MockDB', (), {'Model': object})()
#     # print("Running in test mode without Flask")

#     print("Running in test mode - using mock database")
    
#     class Column:
#         def __init__(self, *args, **kwargs):
#             pass
    
#     class MockModel:
#         pass
    
#     db = type('MockDB', (), {
#         'Model': MockModel,
#         'Column': Column,
#         'Integer': int,
#         'String': str,
#         'Text': str,
#         'ForeignKey': lambda x: x
#     })()

# try:
#     from app import db
# except ImportError:
#     class MockModel:
#         pass
    
#     db = type('MockDB', (), {'Model': MockModel})()
#     print("Running in test mode - using mock database")


class Event(db.Model):
    __tablename__ = 'events'

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(200), nullable=False)
    # description = db.Column(db.Text)
    # price = db.Column(db.Float)
    # location = db.Column(db.String(200))
    # seat_availability = db.Column(db.Integer)
    # date = db.Column(db.Date)
    # time = db.Column(db.Time)
    
    # source_api_id = db.Column(db.Integer, db.ForeignKey('source_apis.id'))

    # tags = db.relationship('Tag', secondary='event_tags', backref='events')


    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(50))
    description = db.Column(db.Text)
    name = db.Column(db.String(200), nullable=False)
    datetime = db.Column(db.String(100))
    location = db.Column(db.String(200))
    seat_availability = db.Column(db.Integer)
    price = db.Column(db.String(50))
    organizer = db.Column(db.String(200))
    followers = db.Column(db.String(50))
    event_link = db.Column(db.String(500))
    image = db.Column(db.String(500))
    image_description = db.Column(db.Text)
    source_api = db.Column(db.String(100))
    rating = db.Column(db.String(20))
    attendees_count = db.Column(db.String(20))
    attendee_image_1 = db.Column(db.String(500))
    attendee_image_2 = db.Column(db.String(500))
    attendee_image_3 = db.Column(db.String(500))

    #  temporary disabled for standalone testing

    source_api_id = db.Column(db.Integer, db.ForeignKey('source_apis.id'))

    tags = db.relationship('Tag', secondary='event_tags', backref='events')


    def to_google_iso8601(self):
        # """Convert the event's datetime to Google Calendar's ISO 8601 format"""
        # name="Tech Conference 2023",
        # datetime="2023-11-15 09:30:00",  # Must match your storage format
        # location="Melbourne",
        
        if not self.datetime:
            return None
            
        try:
            # Parse the stored datetime string
            dt = datetime.strptime(self.datetime, '%Y-%m-%d %H:%M:%S')
            
            # Format to ISO 8601 with timezone (Google's preferred format)
            # Example output: "2024-12-25T15:30:00+00:00"
            return dt.isoformat() + 'Z'  # 'Z' indicates UTC timezone
            
        except (ValueError, TypeError):
            return None
        
    @staticmethod
    def test_google_iso8601_conversion():
    # Create a test event
        # test_event = Event(
        #     name="Tech Conference 2023",
        #     datetime="2025-11-15 09:30:00",  # Must match your storage format
        #     location="Melbourne",
        #     # ... add other required fields ...
        # )

        test_event = Event(
            name="Tech Conference 2023",
            datetime="2025-11-15 09:30:00",  
            location="Melbourne",
            description="Annual technology conference",
            position="1",
            seat_availability=100,
            price="100.00",
            organizer="Tech Org",
            followers="500",
            event_link="https://example.com/event",
            image="https://example.com/image.jpg",
            source_api="test_api",
            rating="4.5"
        )
        
        # Call the conversion method
        iso_datetime = test_event.to_google_iso8601()
        
        # Print or return the result
        print(f"Original datetime: {test_event.datetime}")
        print(f"ISO8601 datetime: {iso_datetime}")
        
        return iso_datetime

# To call this test method, you can do:
if __name__ == "__main__":
    # Call the test method
    result = Event.test_google_iso8601_conversion()
    print(f"Test result: {result}")


       
    # Test the conversion
    # iso_datetime = test_event.to_google_iso8601()
    # print(f"Original datetime: {test_event.datetime}")
    # print(f"Google ISO 8601 format: {iso_datetime}")
    
   

