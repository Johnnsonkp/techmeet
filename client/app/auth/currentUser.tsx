// import { auth } from "@/app/auth/auth.js";
import { auth }from "next-auth";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}