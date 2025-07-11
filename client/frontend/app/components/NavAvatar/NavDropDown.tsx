'use client'

import './avatarStyles.css'

import { LogOutIcon, User2Icon, UserCogIcon } from 'lucide-react'

import Image from 'next/image'
import { LogoutButton } from '@/components/buttons/LogOutButton'

function NavDropDown({user}: any) {
  const fallbackSrc = "https://www.svgrepo.com/show/382106/avatar-boy.svg"

  return (
    <div className={` relative left-11`}>
      <div 
        className={`${user && user.email? "block": 'hidden'}  dropdown-menu absolute right-0 mt-2 w-55 bg-white rounded-lg shadow-xl py-1 z-50 opacity-0 invisible transition-all duration-300 transform -translate-y-2 border border-gray-100"`}>
        <div className="px-4 py-2.5 border-b border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden mr-3">
              {user && user.name && <Image
                alt={"user avatar"}
                className="h-full w-full rounded-full object-cover"
                height={20}
                width={20}
                src={user?.image || fallbackSrc}
              />}
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
        <a href="/dashboard/" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
          <User2Icon size={15}/>
          <span className='ml-2 text-xs'>Dashboard</span>
        </a>
        <a href="/dashboard/user_profile" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
          <UserCogIcon size={15}/>
          <span className='ml-2 text-xs'>Profile</span>
        </a>

        <div className="border-t border-gray-100 my-1"></div>
        
        <LogoutButton>
          <LogOutIcon size={15}/> <span className='ml-2 text-xs'>Sign out</span>
        </LogoutButton>

      </div>

      <div 
        className={`${!user || !user.email? "block": 'hidden'} dropdown-menu absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-1 z-50 opacity-0 invisible transition-all duration-300 transform -translate-y-2 border border-gray-100"`}>
        <a href="/auth" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
          <User2Icon size={15}/>
          <span className='ml-2 text-xs'>Register</span>
        </a>
        <a href="/auth" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
          <UserCogIcon size={15}/>
          <span className='ml-2 text-xs'>Sign in</span>
        </a>

      </div>
      
      
    </div>
  )
}

export default NavDropDown