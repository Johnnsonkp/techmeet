import { FloatingShapes } from '@/components/ui/FloatingShapes';
import Link from 'next/link';
import React from 'react';
import { TimerDisplay } from '@/components/timer/CounterDownTimer';

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 overflow-hidden">
      <FloatingShapes />
      {/* <NextLogoContainer /> */}

    {/* <!-- Main Content --> */}
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glow-text">
        Techmeet
      </h1>
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glow-text">
        Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Soon</span>
      </h1>

      <p className="text-xl text-white/80 max-w-lg mx-auto mb-10">
        We're building something amazing! Stay tuned for our launch.
      </p>

      {/* <!-- Countdown Timer (3D Cards) --> */}
      <TimerDisplay />

      <button className="btn-3d bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg mb-10">
        <Link href="/auth">
          Go to Auth Page
        </Link>
      </button>
    </div>
  </div>

  )
}
