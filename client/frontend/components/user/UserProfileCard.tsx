import { GithubStandAloneBtn, LinkedInStandAloneBtn } from '../ui/buttons/Buttons'

import Image from 'next/image'
import React from 'react'

interface UserI {
  image: string | null,
  first_name?: string | null,
  last_name?: string | null,
  name?: string | null,
  job_tile?: string | null,
  desired_job?: string | null
}

type Props = {
  user: UserI | any;
};

function UserProfileCard({user}: Props) {
  const fallbackSrc = "https://www.svgrepo.com/show/382106/avatar-boy.svg"
  const userName = !user? "John Doe" : user?.first_name && user.last_name || user?.first_name || user?.name
  const userImage = !user? fallbackSrc : user?.image || fallbackSrc
  const currentOccupation = !user? "Occupation" : user?.job_tile || "Occupation"
  const desiredOccupation = !user? "Desired Occupation" : user?.desired_job || "Desired Occupation"

  return (
    <div className="flex items-center space-x-4 w-[100%]">
      <div className="flex-shrink-0">
        <Image 
          height={25}
          width={25}
          className="h-25 w-25 rounded-full object-cover border-3 border-[#3B82F6]" 
          src={userImage} 
          alt="Profile picture" 
        />
      </div>
      <div className="flex-1 min-w-0 mt-7 w-[100%]">
        <p className="text-lg font-bold text-gray-900 truncate">{userName}</p>
        <p className="text-sm text-gray-500 truncate">{currentOccupation} | {desiredOccupation}</p>
        <div className=" items-center space-x-4 mt-1">
          <div className="inline-flex text-sm font-medium text-gray-900">542 Events Attended</div>
          <span className="flex text-sm font-medium text-gray-900">12 Connections</span>
          <span className="flex text-sm font-medium text-gray-900">0 Created Events</span>
        </div>
        <div className="flex text-left justify-items-start mt-3">
          <GithubStandAloneBtn />
          <LinkedInStandAloneBtn />
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard