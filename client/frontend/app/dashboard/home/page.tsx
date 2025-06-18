import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'

import React from 'react'
import { currentUser } from '@/lib/auth/user'

async function page() {
  const user = await currentUser()

  return (
    <div className="flex flex-1 flex-col gap-4 p-15 pt-0">
      <LargeText text={`Welcome, ${user?.name || ""}`}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">

      </div>
      <MediumText text={"Upcoming Events"}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <MediumText text={"Recommended Events"}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}

export default page