from datetime import datetime

class Event:
    """Standalone test class for datetime conversion"""
    
    def __init__(self, datetime_str=None):
        self.datetime = datetime_str
    
    def to_google_iso8601(self):
        """
        Convert datetime string to Google Calendar's ISO 8601 format
        Format: "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DDTHH:MM:SSZ"
        """
        if not self.datetime:
            return None
            
        try:
            dt = datetime.strptime(self.datetime, '%Y-%m-%d %H:%M:%S')
            return dt.isoformat() + 'Z'  # 'Z' indicates UTC timezone
        except (ValueError, TypeError) as e:
            print(f"Conversion error: {str(e)}")
            return None

def test_conversion():
    """Test the datetime conversion"""
    # test_cases = [
    #     ("2025-11-15 09:30:00", "2025-11-15T09:30:00Z"),
    #     ("2023-01-01 00:00:00", "2023-01-01T00:00:00Z"),
    #     (None, None),
    #     ("invalid-date", None),
    #     ("09:30:00 2025-11-15", )
    # ]
    
    test_cases = [
        "2025-11-15 09:30:00",
        "2023-01-01 00:00:00",
        None,
        "invalid-date",
        ("09:30:00 2025-11-15")
    ]
    print("=== Testing datetime conversion ===")
    # for input_dt, expected in test_cases:
    for input_dt in test_cases:
        event = Event(input_dt)
        result = event.to_google_iso8601()
        print(f"Input: {input_dt or 'None':<20} → Output: {result or 'None'}")
if __name__ == "__main__":
    test_conversion()