"use client";

import { FormEvent, useEffect, useState } from "react";
import LoginCard from "../../components/auth/LoginCard";
import ProfileDetailsCard from "../../components/auth/ProfileDetailsCard";
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
        setStep(2)
      }
    }
    checkSession()
  }, [router])

  const handleLoginSuccess = () => {
    setStep(2)
  }

  if (!isAuthenticated && step === 1) {
    return <LoginCard onSuccess={handleLoginSuccess} />
  }

  if (isAuthenticated && step === 2) {
    return <ProfileDetailsCard />
  }

  router.push("/dashboard")
  return null
}

export default LoginPage;