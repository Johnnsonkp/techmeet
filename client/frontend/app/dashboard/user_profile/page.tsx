import { AchievementsCard, ActivityCard, UserBio } from "@/components/profile/Cards"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Edit } from "lucide-react"
import { MediumText } from '@/components/ui/textDisplay/LargeText'
import { NeutralButton } from "@/components/ui/buttons/Buttons"
import React from 'react'
import { SkillTags } from "@/components/profile/Cards"
import UserProfileCard from "@/components/user/UserProfileCard"
import { currentUser } from "@/lib/auth/user"

async function page() {
  const user = await currentUser()

  return (
    <div id="userdDashboard" className="dashboardHidden flex flex-1 flex-col gap-4 p-15 pt-0">
      <div className="grid auto-rows-min gap-3 md:grid-cols-2">
        <UserProfileCard user={user}/>
        <div className="flex h-8 justify-end">  
          <NeutralButton title="Edit" href="/" Icon={Edit} />
        </div>
      </div>
      
      <hr className="mt-5"></hr>
      <div className="flex justify-between mt-2">
        <Tabs defaultValue="profile" className="w-[100%]">
          <TabsList>
            <TabsTrigger className="cursor-pointer px-7" value="profile">Profile</TabsTrigger>
            <TabsTrigger className="cursor-pointer px-7" value="activity">Activity</TabsTrigger>
            <TabsTrigger className="cursor-pointer px-7" value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent className="p-2" value="profile">
            <div className="flex justify-between">
              <UserBio />
              <SkillTags />
            </div>
          </TabsContent>
          <TabsContent className="p-2" value="activity">
            <ActivityCard />
          </TabsContent> 
          <TabsContent className="p-2" value="achievements">
            <AchievementsCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
