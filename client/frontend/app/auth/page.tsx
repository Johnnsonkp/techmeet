"use client";

import { FormEvent, useEffect, useState } from "react";
import ProfileFormCard from "@/components/auth/ProfileFormCard";
import LoginCard from "../../components/auth/LoginCard";
import React from "react";
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginPageProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const router = useRouter()

  console.log("isAuthenticated", isAuthenticated)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        setIsAuthenticated(true)
        router.push('/dashboard')
      }
    }
    checkSession()
  }, [router])

  const handleLoginSuccess = () => {
    setStep(2)
  }

  if (isAuthenticated) return null
  return (
    <>
      {step === 1 ? <LoginCard onSuccess={handleLoginSuccess} /> : <ProfileFormCard />}
    </>
  );
};

export default LoginPage;