import React from 'react'

function NavMobile() {
  return (
    <div id="mobile-menu" className="mobile-menu md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-4 space-y-1">
                <a href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                    <i className="fas fa-home text-blue-500 mr-3 w-5 text-center"></i>
                    Home
                </a>
                <div className="group">
                    <button className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                        <div className="flex items-center">
                            <i className="fas fa-briefcase text-blue-500 mr-3 w-5 text-center"></i>
                            Products
                        </div>
                        <i className="fas fa-chevron-down text-xs transition-transform duration-200 group-focus:rotate-180"></i>
                    </button>
                    <div className="pl-4 mt-1 space-y-1 hidden group-focus:block">
                        <a href="#" className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                            <i className="fas fa-laptop text-blue-400 mr-3 w-5 text-center"></i>
                            Software
                        </a>
                        <a href="#" className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                            <i className="fas fa-server text-blue-400 mr-3 w-5 text-center"></i>
                            Services
                        </a>
                        <a href="#" className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                            <i className="fas fa-mobile-screen text-blue-400 mr-3 w-5 text-center"></i>
                            Apps
                        </a>
                    </div>
                </div>
                <a href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                    <i className="fas fa-building text-blue-500 mr-3 w-5 text-center"></i>
                    Company
                </a>
                <div className="group">
                    <button className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                        <div className="flex items-center">
                            <i className="fas fa-file-alt text-blue-500 mr-3 w-5 text-center"></i>
                            Resources
                        </div>
                        <i className="fas fa-chevron-down text-xs transition-transform duration-200 group-focus:rotate-180"></i>
                    </button>
                    <div className="pl-4 mt-1 space-y-1 hidden group-focus:block">
                        <a href="#" className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                            <i className="fas fa-book text-blue-400 mr-3 w-5 text-center"></i>
                            Documentation
                        </a>
                        <a href="#" className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                            <i className="fas fa-video text-blue-400 mr-3 w-5 text-center"></i>
                            Tutorials
                        </a>
                        <a href="#" className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                            <i className="fas fa-blog text-blue-400 mr-3 w-5 text-center"></i>
                            Blog
                        </a>
                    </div>
                </div>
                <a href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                    <i className="fas fa-envelope text-blue-500 mr-3 w-5 text-center"></i>
                    Contact
                    <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>
                </a>
                <div className="border-t border-gray-200 pt-2 mt-2">
                    <a href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                        <i className="fas fa-user-circle text-blue-500 mr-3 w-5 text-center"></i>
                        Profile
                    </a>
                    <a href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                        <i className="fas fa-cog text-blue-500 mr-3 w-5 text-center"></i>
                        Settings
                    </a>
                    <a href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center transition-colors duration-200">
                        <i className="fas fa-sign-out-alt text-blue-500 mr-3 w-5 text-center"></i>
                        Sign Out
                    </a>
                </div>
            </div>
        </div>
  )
}

export default NavMobile