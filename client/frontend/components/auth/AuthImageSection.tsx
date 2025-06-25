import React from 'react';
import Image from 'next/image';

export const AuthImageSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-black">
      {/* Grid of event images in the background */}
      <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 opacity-30">
        <Image
          src="/images/event1.jpg"
          alt="Event 1"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
        <Image
          src="/images/event2.jpg"
          alt="Event 2"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
        <Image
          src="/images/event3.jpg"
          alt="Event 3"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
        <Image
          src="/images/event4.jpg"
          alt="Event 4"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-6">Join TechMeet</h1>
          <p className="text-xl mb-8 opacity-90">
            Connect with fellow developers, discover amazing tech events, and grow your career in the tech community.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Discover local tech meetups and conferences</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Connect with like-minded developers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Build your professional network</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
