"use client";

import { FormEvent, useEffect, useState } from "react";

import AboutYouCard from "../../components/auth/AboutYouCard";
import LoginCard from "../../components/auth/LoginCard";
import ProfileDetailsCard from "../../components/auth/ProfileDetailsCard";
import React from "react";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      // console.log("session", session)
      if (session) {
        setIsAuthenticated(true);
        setStep(2); // Resume at Profile step if session exists
      }
    };
    checkSession();
  }, [router]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setStep(2);
  };

  const handleProfileSubmit = () => {
    setStep(3);
  };

  const handleAboutYouSubmit = () => {
    router.push("/dashboard"); // Redirect after all 3 steps
  };

  // Step 1: Login
  if (!isAuthenticated && step === 1) {
    return <LoginCard onSuccess={handleLoginSuccess} />;
  }

  // Step 2: Profile Details
  if (step === 2) {
    return <ProfileDetailsCard onNext={handleProfileSubmit} />;
  }

  // Step 3: About You
  if (step === 3) {
    return <AboutYouCard onComplete={handleAboutYouSubmit} />;
  }

  return null;
};

export default LoginPage;
