// 'use client'

import './navStyle.css';

import Avatar from './Avatar';
import NavMobile from './NavMobile';
import React from 'react'
import { SignOutButton } from '../ui/authButtons/AuthButtons';

// import { useEffect, useState } from "react";

const Nav = async () => {

  return (
    <div className="bg-gray-50 border-2">
      <nav className="bg-white p-3 shadow-lg sticky top-0 z-50 h-[100%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
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
                <button className="flex items-center space-x-2 focus:outline-none group">
                  <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden avatar-ring">

                      <Avatar />
                      </div>
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">John Doe</span>
                      <span className="text-xs text-gray-500">Admin</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs text-gray-500 hidden lg:inline transition-transform duration-200 group-hover:text-blue-600"></i>
                </button>
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

export default Nav;