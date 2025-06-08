// use server function still experimental in Next.js v14
// 'use server'  

import { signIn, signOut } from "@/app/auth/auth";
// import { redirect } from "next/dist/server/api-utils";

export async function doSocialLogin(formData) {
  const action = formData.get('action');
  await signIn(action, { redirectTo:"/home"});
}

export async function doLogout() {
  await signOut({redirectTo: "/"});
}