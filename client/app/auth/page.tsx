"use client";
import React from "react";
import AuthCard from "@/components/auth/AuthCard";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AuthCard />
    </div>
  );
};

export default AuthPage;
