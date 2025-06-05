'use client';

import { useEffect, useRef, useState } from 'react';

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function calculateTime(): Timer {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { days, hours, minutes, seconds };
    }

    function updateCountdown() {
      const newTime = calculateTime();
      setTimerObj((prev) => {
        const isSame =
          prev.days === newTime.days &&
          prev.hours === newTime.hours &&
          prev.minutes === newTime.minutes &&
          prev.seconds === newTime.seconds;

        return isSame ? prev : newTime;
      });

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(intervalRef.current!);
        alert("Time is up!");
      }
    }

    intervalRef.current = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(intervalRef.current!); // Cleanup
  }, [targetDateString]);

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
    <div className="grid grid-cols-4 gap-4 mb-12">
      <GlassCard  item={days} metric={"Days"}/>
      <GlassCard  item={hours} metric={"Hours"}/>
      <GlassCard  item={minutes} metric={"Minutes"}/>
      <GlassCard  item={seconds} metric={"Seconds"}/>
    </div>
  );
}