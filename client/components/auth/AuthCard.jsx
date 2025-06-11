"use client";
import { useState } from "react";

export default function AuthCard() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => setIsSignUp(!isSignUp);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? "Create an Account" : "Welcome Back"}
      </h2>

      <form className="space-y-4">
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-sm text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="space-y-3">
        <button className="w-full bg-white border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        {/* Optional GitHub OAuth button */}
        <button className="w-full bg-white border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
          <span>Continue with GitHub</span>
        </button>
      </div>

      <p className="text-sm text-center mt-6 text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={toggleMode} className="text-blue-600 hover:underline">
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
