'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function useSyncFlask() {
  const { data: session } = useSession();
  const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL

  useEffect(() => {

    const sync = async () => {
      if (!session?.access_token || !session.user?.email || session?.provider !== "google") return;

      const res = await fetch(`${base_url}/api/v1/oauth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          name: session.user?.name,
          access_token: session?.access_token,
        }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("tm_jwt", data.token);
        alert("jwt token set to localstorage")
      } else {
        console.error("Failed to get token from Flask:", data);
      }
    };

    sync();
  }, [session]);
}