
"use client";

import { useEffect, useState } from "react";

export function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: August 10th
    const calculateTargetDate = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      // Month is 0-indexed, so August is 7
      let target = new Date(targetYear, 7, 10, 0, 0, 0);

      // If August 10th has already passed this year, target next year
      if (now > target) {
        target = new Date(targetYear + 1, 7, 10, 0, 0, 0);
      }
      return target;
    };

    const targetDate = calculateTargetDate();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="text-3xl sm:text-5xl font-bold text-primary animate-glow">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex bg-white/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
      <Unit value={timeLeft.days} label="Days" />
      <div className="text-3xl sm:text-5xl font-light text-primary/30">:</div>
      <Unit value={timeLeft.hours} label="Hours" />
      <div className="text-3xl sm:text-5xl font-light text-primary/30">:</div>
      <Unit value={timeLeft.minutes} label="Mins" />
      <div className="text-3xl sm:text-5xl font-light text-primary/30">:</div>
      <Unit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
