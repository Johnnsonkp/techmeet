"use client"

import { FormEvent, useEffect, useState, useTransition } from "react";
import { signIn, signOut } from 'next-auth/react'

import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginPageProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const LoginPage: React.FC<LoginPageProps> = ({onSubmit}) => {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl ny-3">Welcome </h1>
      <div>
        <form onSubmit={onSubmit}>
          <button className="flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 border border-blue-700 rounded"
            type="submit" name="action" value="google">
            <img className="w-6 h-6 mx-1" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  )
}

const SignInPage: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

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

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => {
      signIn('google')
    })
  }

  return isAuthenticated ? null : <LoginPage onSubmit={handleSignIn} />
}

export default SignInPage;