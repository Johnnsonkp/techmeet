import React from 'react';

export const AuthImageSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
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
      {/* Background Pattern */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
      </div>
    </div>
  );
};