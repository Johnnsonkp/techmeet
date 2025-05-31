'use client';

import { useEffect, useState } from 'react';

import { CalendarSmall } from '@/components/calendar/SmallCalendar';
import Image from 'next/image'

export default function Home() {

  const [data, setData] = useState<any>(null);
  const [timerObj, setTimerObj] = useState<any>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });


  const targetDate = new Date("2025-07-14T23:59:59");

  function updateCountdown() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      alert("Time is up!")
      clearInterval(interval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);


    setTimerObj({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    })
  }
  const interval = setInterval(updateCountdown, 1000);
  

  useEffect(() => {
    // oauth route
    fetch("http://127.0.0.1:5328/api/v1/oauth_connection/login")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));


    updateCountdown()
  }, []);

  interface GlassCardProps {
    item: any;
    metric: any;
  }

  const GlassCard: React.FC<GlassCardProps> = ({item, metric}) => {
    const styles = {
      glassCard: {
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }
    }

    return <div style={styles.glassCard} className={`glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all`}>
      <div className="text-3xl font-bold text-white">{item}</div>
      <div className="text-white/70 text-sm">{metric}</div>
    </div>
  }

  

  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 overflow-hidden">
    {/* <!-- Floating 3D Shapes (Background) --> */}
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl floating"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-xl floating-2"></div>
      <div className="absolute bottom-1/4 right-1/3 w-28 h-28 rounded-full bg-pink-500/20 blur-xl floating-3"></div>
    </div>

    {/* <a
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
    </a> */}

    {/* <!-- Main Content --> */}
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* <!-- 3D Logo/Brand --> */}
      
      {/* <!-- Heading with Glow --> */}
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glow-text">
        Techmeet
      </h1>
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glow-text">
        Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Soon</span>
      </h1>

      {/* <!-- Subheading --> */}
      <p className="text-xl text-white/80 max-w-lg mx-auto mb-10">
        We're building something amazing! Stay tuned for our launch.
      </p>

      {/* <!-- Countdown Timer (3D Cards) --> */}
      <div className="grid grid-cols-4 gap-4 mb-12">
        <GlassCard  item={timerObj.days} metric={"Days"}/>
        <GlassCard  item={timerObj.hours} metric={"Hours"}/>
        <GlassCard  item={timerObj.minutes} metric={"Minutes"}/>
        <GlassCard  item={timerObj.seconds} metric={"Seconds"}/>
      </div>

      {/* <!-- 3D CTA Button --> */}
      <button className="btn-3d bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg mb-10">
        Notify Me on Launch
      </button>

    </div>
  </main>

  )
}
