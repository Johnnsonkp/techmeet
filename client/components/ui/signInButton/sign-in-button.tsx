"use client";

import './signin-button.css'

import { useRouter } from "next/navigation";

export const SignInButton = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();

  return (
    <button
      className={props.className || 'signin-button '}
      style={{ cursor: "pointer" }}
      onClick={() => {
        router.push("/auth");
      }}
    >
      {props.children || "Sign In"}
    </button>
  );
};