import GoogleProvider from "next-auth/providers/google";
import { SessionProvider } from "next-auth/react";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }, // Fixed comma added
      },
    }), // Correctly closed GoogleProvider
  ],
}; // Correctly closed export
//--------------------------------
// template
// configuration for providers and call// app/auth/auth.config.js
// import GitHub from "next-auth/providers/github";
// export default {
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // Add other providers here
//   ],
//   // Optional: Add callbacks, pages, etc.
// };










