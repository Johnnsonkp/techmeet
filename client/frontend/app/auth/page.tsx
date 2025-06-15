"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { signIn, signOut } from 'next-auth/react'

import LoginCard from "../../components/auth/LoginCard";
import React from "react";
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginPageProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

  return isAuthenticated ? null : <LoginCard />
}

export default LoginPage;