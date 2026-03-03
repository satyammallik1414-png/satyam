
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isAngry, setIsAngry] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [heartProps, setHeartProps] = useState<{ x: string; yStart: string; duration: number; delay: number; size: number }[]>([]);
  const [angryEmojiProps, setAngryEmojiProps] = useState<{ x: string; yStart: string; duration: number; delay: number; rotate: number; emojiIndex: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const angryEmojis = ["😡", "🤬", "💢", "😤", "👿", "🚫", "👊", "🔥", "⚠️", "💀"];

  useEffect(() => {
    setMounted(true);
    // Initialize random values on client only to avoid hydration mismatch
    setHeartProps(Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100 + "vw",
      yStart: "110vh",
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      size: Math.random() * 40 + 20
    })));
    setAngryEmojiProps(Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100 + "vw",
      yStart: "110vh",
      duration: 1 + Math.random() * 1.5,
      delay: Math.random() * 1,
      rotate: Math.random() * 360,
      emojiIndex: Math.floor(Math.random() * angryEmojis.length)
    })));
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "iloveugalu") {
      setIsUnlocked(true);
      setIsAngry(false);
    } else {
      triggerAngryMode();
    }
  };

  const triggerAngryMode = () => {
    setIsAngry(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback if browser blocks audio
      });
    }
    // Reset after some time
    setTimeout(() => {
      setIsAngry(false);
      setPassword("");
    }, 4000);
  };

  if (!mounted) return null;

  if (isUnlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden">
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {!isAngry ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md p-8 text-center space-y-8 relative z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center border border-primary/20 shadow-xl"
            >
              <Lock className="text-primary w-12 h-12" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-primary">Secret Access Only</h2>
              <p className="text-muted-foreground">Please enter the secret word to unlock your birthday magic.</p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <Input
                type="password"
                placeholder="The secret word..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center text-lg h-14 rounded-2xl border-primary/20 focus:ring-primary"
                autoFocus
              />
              <Button type="submit" className="w-full h-14 text-lg rounded-2xl shadow-lg hover:shadow-primary/30 transition-all">
                Unlock the Magic ✨
              </Button>
            </form>

            <div className="pt-4 flex items-center justify-center gap-2 text-primary/40">
              <Heart size={16} fill="currentColor" />
              <span className="text-xs font-medium uppercase tracking-widest">Galu, Baby Only</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="angry"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              backgroundColor: "rgba(255, 0, 0, 0.15)",
              transition: { duration: 0.2 }
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[200] bg-white"
          >
            {/* Chaotic Background Stickers (Angry Emojis) */}
            <div className="absolute inset-0 pointer-events-none">
               {angryEmojiProps.map((prop, i) => (
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
                  className="absolute text-5xl sm:text-7xl select-none"
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
              className="text-center space-y-6 relative z-10"
            >
              <div className="relative mb-8 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="text-[10rem] sm:text-[15rem] drop-shadow-[0_0_50px_rgba(255,0,0,0.8)] select-none"
                >
                  😡
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], y: [-20, 0, -20] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 bg-red-600 text-white p-4 rounded-full shadow-2xl border-4 border-white"
                >
                  <ShieldAlert size={48} />
                </motion.div>
              </div>

              <div className="space-y-4">
                <h1 className="text-7xl md:text-9xl font-black text-red-600 uppercase tracking-tighter drop-shadow-lg">
                  GET OUT!
                </h1>
                <div className="flex justify-center gap-6">
                   <motion.span animate={{ scale: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.2 }} className="text-7xl">🤬</motion.span>
                   <motion.span animate={{ scale: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.2, delay: 0.05 }} className="text-7xl">💢</motion.span>
                   <motion.span animate={{ scale: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.2, delay: 0.1 }} className="text-7xl">👿</motion.span>
                </div>
                <p className="text-3xl font-bold text-slate-800 bg-white/90 px-10 py-3 rounded-full inline-block backdrop-blur-md border-4 border-red-500 shadow-xl">
                  THIS IS NOT FOR YOU! 😤
                </p>
              </div>
            </motion.div>

            {/* Intense Red Flash Overlay */}
            <motion.div
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.05, repeat: Infinity }}
              className="absolute inset-0 bg-red-600 pointer-events-none mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isAngry && (
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
          {heartProps.map((prop, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              initial={{ x: prop.x, y: prop.yStart }}
              animate={{ 
                y: "-10vh"
              }}
              transition={{ 
                duration: prop.duration, 
                repeat: Infinity,
                delay: prop.delay
              }}
            >
              <Heart size={prop.size} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
