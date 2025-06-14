// 'use client'

import './navStyle.css';

// import Avatar from './Avatar';
import GithubNavButton from './GithubNavButton'
import Link from 'next/link';
import NavMobile from './NavMobile';
import React from 'react'
import { SignOutButton } from '../ui/authButtons/AuthButtons';

export default async function CustomHeader() {

  return (
    <div className="bg-gray-50 border-2 fixed w-full z-60">
      <nav className="bg-white p-3 shadow-lg sticky top-0 z-50 h-[100%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          <div className="flex items-center cursor-pointer z-60">
            <a href="/" className="flex items-center group cursor-pointer z-10">
                <div className="bg-blue-600 group-hover:bg-blue-700 p-2 rounded-lg transition-colors duration-300">
                    <i className="fas fa-cube text-white text-xl"></i>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Techmeet</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">                  
            </div>

            {/* <!-- Right Section - Actions --> */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block h-6 w-px bg-gray-200"></div>
              <div className="dropdown relative">
                <div className="flex items-center space-x-2 focus:outline-none group">
                  <div className="relative flex">
                    <div className="h-9 w-9 mx-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden avatar-ring">
                      <Avatar />
                    </div>
                    <SignOutButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Mobile Menu --> */}
        <NavMobile />
      </nav>
    </div>

    
  )
}
