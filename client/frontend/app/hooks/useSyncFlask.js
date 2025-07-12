'use client';

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

// export function useSyncFlask() {
//   const { data: session } = useSession();
//   const setAuth = useAuthStore((s) => s.setAuth);

//   const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL

//   useEffect(() => {
//     console.log("base_url", base_url)
//     console.log("session", session)

//     if (!session) return;

//     const sync = async () => {
//       const jwt = localStorage.getItem("tm_jwt");
//       if (jwt) return; // Already synced

//       const { access_token, provider, user } = session as any;

//       // if (!session?.access_token || !session.user?.email || session?.provider !== "google") return;

//       // Only sync if authenticated with Google
//       if (!access_token || provider !== 'google' || !user?.email) return;

//         try {
//           setAuth({
//               user: {
//                 id: user.id,
//                 email: user.email,
//                 name: user.name,
//                 image: user.image,
//               },
//               accessToken: access_token,
//               provider: provider,
//           });

//           const res = await fetch(`${base_url}/api/v1/oauth/google`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: session?.user.email,
//               name: session.user?.name,
//               access_token: session?.access_token,
//             }),
//           });

//           const data = await res.json();
//           console.log("user data:", data)

//           if (!res.ok) {
//               console.error('Flask sync failed:', data);
//               return;
//           }
          
//           if (data.token) {
//             localStorage.setItem("tm_jwt", data.token);
//             console.log("JWT token stored in localStorage");
//           } else {
//             console.error("Failed to get token from Flask:", data);
//           }
//         } catch (err) {
//           console.error('Error syncing with Flask:', err);
//         }
//     };
    
//     sync();
//   }, [session,  setAuth, base_url]);
// }

export function useSyncFlask() {
  const { data: session } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL

  useEffect(() => {
    console.log("base_url", base_url)
    console.log("session", session)

    if (!session) return;

    const sync = async () => {
      const jwt = localStorage.getItem("tm_jwt");
      if (jwt) return; // Already synced

      if (!session?.access_token || !session.user?.email || session?.provider !== "google") return;

      setAuth({
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
        accessToken: session?.access_token ?? null,
        provider: session?.provider ?? null,
      });

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
        console.log("JWT token stored in localStorage");
      } else {
        console.error("Failed to get token from Flask:", data);
      }
    };

    sync();
  }, [session]);
}