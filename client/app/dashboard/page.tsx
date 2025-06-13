import { currentUser, requireAuth } from '@/lib/auth/user'

import { SignOutButton } from "@/components/ui/authButtons/AuthButtons";

const DashboardPage = async ()  => {
  await requireAuth()
  const user = await currentUser()

  return (
    <div className="border-2 p-5 pt-20">
      <div className="flex justify-between">
        <h1>Dashboard</h1>
        <SignOutButton />
      </div>
      
      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Avatar: {user?.image}</p> 
    </div>
  )
}

export default DashboardPage