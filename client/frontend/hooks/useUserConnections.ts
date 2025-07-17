import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";

export function useUserConnections() {
  const [fetchedConnection, setFetchedConnections]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const token = useAuthStore((s) => s.access_token);
  const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || "http://localhost:5328";

  useEffect(() => {
    console.log("Fetching user connections with token:", token);

    async function fetchConnections() {
      setLoading(true);
      setConnectionError(null);
      try {
        const res = await fetch(`${BASE_URL}/api/v1/connections/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to fetch connections");
        }
        const data = await res.json();
        setFetchedConnections(data);
      } catch (err: any) {
        setConnectionError(err.message || "Failed to fetch connections");
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchConnections();
  }, [token, BASE_URL]);

  return { fetchedConnection, loading, connectionError };
}