"use client";

import React, { useState } from "react";

import { AuthButton } from "./AuthButton";

const LoginCard: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleMode = () => setIsSignUp(!isSignUp);

  return (
    <div className="h-screen w-screen flex justify-center items-center font-poppins">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
        <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 lg:p-10 md:p-10 sm:p-6 p-4 m-2 w-full max-w-md">
          <h1 className="pt-4 pb-6 font-bold text-4xl text-center">
            {isSignUp ? "Create an Account" : "Log in"}
          </h1>

          <form className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border p-3 shadow-md placeholder:text-base focus:scale-105 transition duration-300 border-gray-300 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border p-3 shadow-md placeholder:text-base focus:scale-105 transition duration-300 border-gray-300 rounded-lg w-full"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              required
              className="border p-3 shadow-md placeholder:text-base focus:scale-105 transition duration-300 border-gray-300 rounded-lg w-full"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="border p-3 shadow-md placeholder:text-base focus:scale-105 transition duration-300 border-gray-300 rounded-lg w-full"
            />

            {!isSignUp && (
              <a
                href="#"
                className="group text-blue-400 text-sm transition-all duration-100 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Forget your password?
                </span>
              </a>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="flex flex-col mt-6 items-center text-sm text-gray-600 ">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-blue-500 hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="flex items-center justify-center mt-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex-row items-center justify-center mt-4 space-x-4">
            <AuthButton
              provider="google"
              label="Sign in with Google"
              iconSrc="https://www.svgrepo.com/show/475656/google-color.svg"
            />
            <AuthButton
              provider="github"
              label="Sign in with GitHub"
              iconSrc="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
            />
          </div>

          {/* <p className="text-gray-500 dark:text-gray-400 text-xs text-center mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
