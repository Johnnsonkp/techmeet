from cloudinary import CloudinaryImage
import cloudinary
import cloudinary.uploader
from app import db
from app.api.v1.models.user_event import UserEvent

class UserFacade:
    @staticmethod
    def to_dict(user):
        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "job_title": user.job_title,
            "employment_status": user.employment_status,
            "address": user.address,
            "bio": user.bio,
            "technical_skills": user.technical_skills,
            "profile_photo_url": user.profile_photo_url,
            "is_admin": user.is_admin,
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "updated_at": user.updated_at.isoformat() if user.updated_at else None,
        }
    
    @staticmethod
    def cloudinary_img_upload(file, public_id):
        cloudinary.uploader.upload(file, public_id=f"{public_id}", unique_filename = False, overwrite=True)

        # Build the URL for the image and save it in the variable 'srcURL'
        srcURL = CloudinaryImage(f"{public_id}").build_url(secure=True)

        # Log the image URL to the console. 
        # Copy this URL in a browser tab to generate the image on the fly.
        print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")

        return srcURL


class UserEventFacade:
    @staticmethod
    def book_event(user_id, event_id):
        # Check if already booked
        existing = UserEvent.query.filter_by(user_id=user_id, event_id=event_id).first()
        if existing:
            return False, "User already booked this event."
        booking = UserEvent(user_id=user_id, event_id=event_id)
        db.session.add(booking)
        db.session.commit()
        return True, "Event booked successfully."