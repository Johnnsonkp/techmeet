import { useEffect, useState } from "react";

export function useFetchUserProfile(token: string | null) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || 'http://localhost:5328';

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        console.log("Fetched profile data:", data);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { profile, loading, error };
}

// class Connection(db.Model):
//   __tablename__ = 'connections'

//   id = db.Column(db.Integer, primary_key=True)
//   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
//   name = db.Column(db.String(120))
//   email = db.Column(db.String(120))
//   linkedin = db.Column(db.String(120))
//   company = db.Column(db.String(120))
//   company_location = db.Column(db.String(120))


// from app import db

// class Goal(db.Model):
//     __tablename__ = 'goals'
//     id = db.Column(db.Integer, primary_key=True)
//     title = db.Column(db.String(255), nullable=False)
//     start_date = db.Column(db.Date)
//     due_date = db.Column(db.Date)
//     description = db.Column(db.Text)
//     tags = db.Column(db.JSON)  # List of tags as JSON array
//     connections = db.relationship('Connection', back_populates='goal')

// class Connection(db.Model):
//     __tablename__ = 'connections'
//     id = db.Column(db.Integer, primary_key=True)
//     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
//     name = db.Column(db.String(255), nullable=False)
//     email = db.Column(db.String(255))
//     company = db.Column(db.String(255))
//     job_title = db.Column(db.String(255))
//     event_met = db.Column(db.String(255))
//     event_date = db.Column(db.String(64))
//     notes = db.Column(db.Text)
//     tags = db.Column(db.JSON)  # List of tags as JSON array
//     linkedin = db.Column(db.String(255))
//     github = db.Column(db.String(255))
//     goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'))
//     goal = db.relationship('Goal', back_populates='connections')
//     user = db.relationship('User', back_populates='connections')