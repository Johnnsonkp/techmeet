'use client';

import { useEffect, useRef, useState } from 'react';

import CircularControl from '../control/CircularControl';
import CircularControl3 from '../control/CicularControl3';
import CircularRemote2 from '@/components/hero/CircularRemote2';

type Timer = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function useCountdownTimer(targetDateString: string) {
  const [timerObj, setTimerObj] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date(targetDateString);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // useEffect(() => {
  //   function calculateTime(): Timer {
  //     const now = new Date();
  //     const diff = targetDate.getTime() - now.getTime();

  //     if (diff <= 0) {
  //       return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  //     }

  //     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //     const minutes = Math.floor((diff / (1000 * 60)) % 60);
  //     const seconds = Math.floor((diff / 1000) % 60);

  //     return { days, hours, minutes, seconds };
  //   }

  //   function updateCountdown() {
  //     const newTime = calculateTime();
  //     setTimerObj((prev) => {
  //       const isSame =
  //         prev.days === newTime.days &&
  //         prev.hours === newTime.hours &&
  //         prev.minutes === newTime.minutes &&
  //         prev.seconds === newTime.seconds;

  //       return isSame ? prev : newTime;
  //     });

  //     if (
  //       newTime.days === 0 &&
  //       newTime.hours === 0 &&
  //       newTime.minutes === 0 &&
  //       newTime.seconds === 0
  //     ) {
  //       clearInterval(intervalRef.current!);
  //       // alert("Time is up!");
  //     }
  //   }

  //   intervalRef.current = setInterval(updateCountdown, 1000);
  //   updateCountdown(); // Initial call

  //   return () => clearInterval(intervalRef.current!); // Cleanup
  // }, [targetDateString, targetDate]);

  return timerObj;
}


export function TimerDisplay() {
  const { days, hours, minutes, seconds } = useCountdownTimer("2025-07-14T23:59:59");

  interface GlassCardProps {
    item: any;
    metric: any;
  }
  
  const GlassCard: React.FC<GlassCardProps> = ({item, metric}) => {
      const styles = {
        glassCard: {
          backdropFilter: "blur(12px)",
          background: "rgba(0, 0, 0, 0.15)",
        }
      }
  
      return( 
        <div style={styles.glassCard} 
          className={`glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all w-32 h-32 border-white border-4 flex-row justify-center items-center`}>
          <div className="text-4xl font-bold text-white">{item}</div>
          <div className="text-xl text-white">{metric}</div>
        </div>
      )
  }

  const text = [
    "Events Discovery ~ Events Discovery ~ Events Discovery ~ Events Discovery ~",
    "Calendar Integration ~ Calendar Integration ~ Calendar Integration ~ Calendar Integration ~",
    "Google Authentication ~ Google Authentication ~ Google Authentication ~ Google Authentication ~",
    "Profile Creation ~ Profile Creation ~ Profile Creation ~ Profile Creation ~",
    // "Curated Tech Blogs ~ Curated Tech Blogs ~ Curated Tech Blogs ~ Curated Tech Blogs ~"
  ];
  // Summary words for each segment
  const segmentLabels = [
    "Events",
    "Calendar",
    "Auth",
    "Profile",
    // "Blogs"
  ];

  // State for current text index
  const [currentTextIdx, setCurrentTextIdx] = useState(0);
  const currentText = text[currentTextIdx];

  useEffect(() => {
    // Use a ref to avoid closure over stale state
    let index = currentTextIdx;
    const interval = setInterval(() => {
      index = (index + 1) % text.length;
      setCurrentTextIdx(index);
    }, 20000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 -mt-16 group">
      <GlassCard  item={days} metric={"Days"}/>
      <GlassCard  item={hours} metric={"Hours"}/>
      <GlassCard  item={minutes} metric={"Minutes"}/>
      <GlassCard  item={seconds} metric={"Seconds"}/>

      <div className="z-10 p-0 absolute top-90 right-[-80px]">
        {/* <img src="/images/event-s-2.png" alt="Event S" className="border-2 border-red-500 w-[500px] z-10 p-0 scale-[0.8]" /> */}
        <CircularControl3 text={currentText}/>
        <CircularRemote2 segments={segmentLabels} highlightedIdx={currentTextIdx} />
        {/* <CircularControl className='' /> */}
      </div>
    </div>
  );
}