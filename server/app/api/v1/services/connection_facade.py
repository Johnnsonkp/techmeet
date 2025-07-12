# class Connection(db.Model):
#     # ...existing code...
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'name': self.name,
#             'email': self.email,
#             'company': self.company,
#             'job_title': self.job_title,
#             'event_met': self.event_met,
#             'event_date': self.event_date,
#             'notes': self.notes,
#             'tags': self.tags,
#             'linkedin': self.linkedin,
#             'github': self.github,
#             # Add other fields as needed
#         }