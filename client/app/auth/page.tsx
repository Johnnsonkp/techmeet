"use client"

// import LoginForm from "@/components/loginForm/LoginForm";
import LoginForm from "@/components/loginForm/LoginForm";
import {doNextAuthLogin} from "@/app/actions/index";
import { useSession } from "next-auth/react";
export default function Home() {
  // const { data: session } = useSession();
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl ny-3">Welcome </h1>
      <LoginForm />
     <div>
 {/* <button className="text-black-800 bg-white pointer-cursor border-solid-red" */}
    <form action={doNextAuthLogin}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 border border-blue-700 rounded"
        type="submit" name="action" value="google"><img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        Login with Google
      </button>
    </form>
      </div>
    </div>
  );
}