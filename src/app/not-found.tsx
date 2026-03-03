
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";
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
      delay: Math.random() * 1,
      rotate: Math.random() * 360,
      emojiIndex: Math.floor(Math.random() * angryEmojis.length)
    })));

    // Try to play the alarm sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Fallback for browser auto-play block
      });
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

      {/* Chaotic Background Stickers */}
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
            className="absolute text-6xl select-none"
          >
            {angryEmojis[prop.emojiIndex]}
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ 
          x: [-10, 10, -10, 10, 0],
          rotate: [-5, 5, -5, 5, 0]
        }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="text-center space-y-8 relative z-10"
      >
        <div className="relative mb-12 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="text-[12rem] sm:text-[18rem] drop-shadow-[0_0_50px_rgba(255,0,0,0.6)] select-none"
          >
            😡
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], y: [-20, 0, -20] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="absolute -top-10 -right-10 bg-red-600 text-white p-5 rounded-full shadow-2xl border-4 border-white"
          >
            <ShieldAlert size={64} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-black text-red-600 uppercase tracking-tighter drop-shadow-xl">
            NOT FOUND!
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-slate-800 bg-white/90 px-12 py-4 rounded-full inline-block backdrop-blur-md border-4 border-red-500 shadow-2xl">
            YOU DON'T BELONG HERE! 😤
          </p>
        </div>

        <div className="pt-10">
          <Link href="/">
            <Button size="lg" className="rounded-full h-16 px-10 text-xl gap-3 bg-slate-900 hover:bg-black text-white shadow-2xl transition-all hover:scale-110">
              <Home size={24} /> GO BACK TO SAFETY
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Intense Red Flash Overlay */}
      <motion.div
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.05, repeat: Infinity }}
        className="absolute inset-0 bg-red-600 pointer-events-none mix-blend-overlay"
      />
    </main>
  );
}
