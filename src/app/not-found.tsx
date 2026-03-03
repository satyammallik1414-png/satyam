
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const angryEmojis = ["😡", "🤬", "💢", "😤", "👿", "🚫", "👊", "🔥", "⚠️", "💀"];
  const [emojiProps, setEmojiProps] = useState<{ x: string; yStart: string; duration: number; delay: number; rotate: number; emojiIndex: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    setEmojiProps(Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100 + "vw",
      yStart: "110vh",
      duration: 1 + Math.random() * 1.5,
      delay: Math.random() * 0.5,
      rotate: Math.random() * 360,
      emojiIndex: Math.floor(Math.random() * angryEmojis.length)
    })));

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance("You don't belong here. Go back!");
      msg.rate = 1;
      msg.pitch = 0.5;
      window.speechSynthesis.speak(msg);
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-white overflow-hidden">
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        autoPlay
      />

      <div className="absolute inset-0 pointer-events-none">
        {emojiProps.map((prop, i) => (
          <motion.div
            key={i}
            initial={{ x: prop.x, y: prop.yStart, rotate: prop.rotate }}
            animate={{ 
              y: "-10vh",
              rotate: prop.rotate + 360
            }}
            transition={{ 
              duration: prop.duration,
              repeat: Infinity,
              delay: prop.delay
            }}
            className="absolute text-5xl md:text-7xl select-none"
          >
            {angryEmojis[prop.emojiIndex]}
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ 
          x: [-10, 10, -10, 10, 0],
          rotate: [-3, 3, -3, 3, 0]
        }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="text-center space-y-6 md:space-y-8 relative z-10 p-4"
      >
        <div className="relative mb-6 md:mb-12 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="text-[10rem] md:text-[20rem] drop-shadow-[0_0_60px_rgba(255,0,0,0.7)] select-none leading-none"
          >
            😡
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.6, 1], y: [-20, 0, -20] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-red-600 text-white p-4 md:p-6 rounded-full shadow-2xl border-2 md:border-4 border-white flex items-center justify-center"
          >
            <span className="text-3xl md:text-6xl">❤️</span>
          </motion.div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h1 className="text-5xl md:text-[10rem] font-black text-red-600 uppercase tracking-tighter drop-shadow-2xl">
            GET OUT!
          </h1>
          <p className="text-xl md:text-5xl font-black text-slate-800 bg-white/95 px-8 md:px-14 py-3 md:py-5 rounded-full inline-block backdrop-blur-md border-2 md:border-4 border-red-600 shadow-2xl">
            NOT FOR YOU! 😤
          </p>
        </div>

        <div className="pt-6 md:pt-10">
          <Link href="/">
            <Button size="lg" className="rounded-full h-16 md:h-20 px-8 md:px-12 text-xl md:text-2xl gap-3 bg-slate-900 hover:bg-black text-white shadow-2xl transition-all hover:scale-105">
              <Home size={24} /> BACK TO SAFETY ❤️
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.05, repeat: Infinity }}
        className="absolute inset-0 bg-red-600 pointer-events-none mix-blend-overlay"
      />
    </main>
  );
}
