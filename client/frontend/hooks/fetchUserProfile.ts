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