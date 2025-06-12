import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import { TimerDisplay } from '@/components/timer/CounterDownTimer';

export default function Home() {
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 overflow-hidden">
    {/* <!-- Floating 3D Shapes (Background) --> */}
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl floating"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-xl floating-2"></div>
      <div className="absolute bottom-1/4 right-1/3 w-28 h-28 rounded-full bg-pink-500/20 blur-xl floating-3"></div>
    </div>

    <a
      className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/next.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={150}
        height={48}
        priority
      />
    </a>

    {/* <!-- Main Content --> */}
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* <!-- 3D Logo/Brand --> */}
      
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
  </main>

  )
}
