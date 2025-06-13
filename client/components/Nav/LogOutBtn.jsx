import React from 'react'

function LogOutBtn() {
  return (
    <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors duration-200">
        <i className="fas fa-sign-out-alt text-gray-400 mr-3 w-5 text-center"></i>
        Sign out
    </a>
  )
}

export default LogOutBtn