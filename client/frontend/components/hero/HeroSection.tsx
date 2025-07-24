import './heroSection.css';

import { Button } from "../ui/button";
import CircularRemote2 from "./CircularRemote2";
import HeroBackgroundVid from "../video/HeroBackgroundVid";
import HeroEventSearch from "../search/HeroEventSearch";
import Link from "next/link";

export const HeroSection = () => {


  return (
    <section 
      className="relative h-[650px] flex items-center justify-start bg-cover bg-center overflow-hidden"
    >
      {/* Video Background */}
      <HeroBackgroundVid />

      {/* Gradient Blur Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/4 h-3/4 rounded-full mx-auto blur-4xl bg-black/10 opacity-100" style={{filter: 'blur(40px)'}} />
        </div>
      </div>

      {/* Centered Content */}
      {/* <div className="relative z-30 flex flex-col items-center justify-center h-full w-full text-center max-w-4xl mx-auto px-4">

        <div className="inline-block mb-4">
          <div className="flex items-center gap-2 bg-white bg-opacity-40 backdrop-blur-sm rounded-full px-3 py-1 text-black font-medium shadow-md transition-opacity duration-300" style={{ opacity: 0.7 }}>
            <svg className="w-3 h-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            <span style={{ opacity: 1 }} className="text-xs">DISCOVER, RESERVE, CONNECT!</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-200">
          The #1 Platform for Discovering Tech Events & Networking Opportunities
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Whether you're a career changer, an upskiller, or seeking a community discover the latest tech meetups, conferences, and workshops near you to reach your goals.
        </p>

        <HeroEventSearch />

      </div> */}


      <div className="relative z-30 flex flex-col  justify-center h-full w-full  max-w-4xl px-10 ">

          <div className="inline-block mb-4 max-w-xs">
            <div 
              className="flex items-center gap-2 bg-white bg-opacity-40 backdrop-blur-sm rounded-full px-3 py-1 text-black font-medium shadow-md transition-opacity duration-300" 
              style={{ opacity: 0.7 }}
            >
              <svg className="w-3 h-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
              <span style={{ opacity: 1 }} className="text-sm">DISCOVER. RESERVE. CONNECT!</span>
            </div>
          </div>

          {/* <h1 className="text-4xl md:text-6xl font-semibold space-x-1 mb-6 leading-tight text-gray-200">
            #1 Platform for Discovering Tech Events & Networking Opportunities
          </h1> */}
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold mb-6 text-gray-200">
            #1 Platform for Discovering Tech Events & Networking Opportunities
          </h1>

          <div className="flex align-end justify-between max-w-xl">
            <div className="text-white font-normal text-xl flex items-center align-end mt-7 flex-[0.5]">
              DISCOVER. RESERVE. CONNECT!
            </div>

            <Button 
              className="mt-8 max-w-lg text-lg rounded-full cursor-pointer flex-[0.5] transition-colors duration-300 custom-shadow-btn"
            >
              <Link 
                href="/events" 
                className="z-1 rounded-full flex items-center justify-center w-full h-full hover:bg-blue-600 transition-colors duration-300"
              >
                To Events Discovery
              </Link>
            </Button>
          </div>

      </div>

    </section>
  );
};

