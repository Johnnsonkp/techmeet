import React from 'react'
import {Tag} from './Tag'

export function UserBio() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mr-2">
      <h2 className="text-xl font-bold mb-4">Bio</h2>
      <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
          vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
          suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
          luctus risus rhoncus id.
      </p>
    </div>
  )
}

export function SkillTags() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 ml-2">
      <h2 className="text-xl font-bold mb-4">Skills & Technologies</h2>

      <ul className="flex flex-wrap gap-2 px-6 py-2 border-b">
        <Tag name="tailwind_flex"/>
        <Tag name="CSS"/>
        <Tag name="Javascript"/>
      </ul>
    </div>
  )
}

export function ActivityCard(){
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
          vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
          suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
          luctus risus rhoncus id.
      </p>
    </div>
  )
}

export function AchievementsCard(){
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
          vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
          suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
          luctus risus rhoncus id.
      </p>
    </div>
  )
}