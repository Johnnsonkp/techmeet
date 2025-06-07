import NextAuth from "next-auth";

export const {
  handlers: { GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
      // add alternative authenicator
  ],
});
