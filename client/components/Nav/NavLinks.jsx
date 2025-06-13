import React from 'react'

function NavLinks() {
  return (
    <>
    <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
        <i className="fas fa-user-circle text-gray-400 mr-3 w-5 text-center"></i>
        My Profile
    </a>
    <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
        <i className="fas fa-cog text-gray-400 mr-3 w-5 text-center"></i>
        Account Settings
    </a>
    <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
        <i className="fas fa-envelope text-gray-400 mr-3 w-5 text-center"></i>
        Messages
        <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
    </a>
    </>
  )
}

export default NavLinks