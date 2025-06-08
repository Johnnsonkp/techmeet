// use server function still experimental in Next.js v15
// 'use server'  
'use client'

import { signIn, signOut } from "@/app/auth/auth";
// import { redirect } from "next/dist/server/api-utils";

export async function doNextAuthLogin(formData) {
  const action = formData.get('action');
  // await signIn(action, { redirectTo:"/login"}); // redirectTo is not used in NextAuth v5
  await signIn(action, { callbackUrl:"/login"});

}

export async function doLogout() {
  // await signOut({redirectTo: "/"});
  await signOut({ callbackUrl: "/"});
  
}