"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, ShieldAlert, XCircle, Angry } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isAngry, setIsAngry] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
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
            initial={{ opacity: 0, backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ 
              opacity: 1, 
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[200] bg-white"
          >
            {/* Chaotic Background Stickers */}
            <div className="absolute inset-0 pointer-events-none">
               {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 - 50 + "vw", 
                    y: "100vh", 
                    rotate: Math.random() * 360 
                  }}
                  animate={{ 
                    y: "-10vh",
                    x: (Math.random() * 100 - 50) + "vw",
                    rotate: Math.random() * 720
                  }}
                  transition={{ 
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity
                  }}
                  className="absolute"
                >
                  <div className="relative w-20 h-20 opacity-40">
                    <Image
                      src={`https://picsum.photos/seed/angry${i}/200/200`}
                      alt="Angry Mood"
                      fill
                      className="rounded-full object-cover grayscale"
                      data-ai-hint="angry face"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ 
                x: [-5, 5, -5, 5, 0],
                rotate: [-2, 2, -2, 2, 0]
              }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="text-center space-y-6 relative z-10"
            >
              <div className="relative w-48 h-48 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                <Image
                  src="https://picsum.photos/seed/angersticker/400/400"
                  alt="Angry Sticker"
                  fill
                  className="object-contain"
                  data-ai-hint="angry boy"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full shadow-lg"
                >
                  <ShieldAlert size={32} />
                </motion.div>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black text-red-600 uppercase tracking-tighter">
                  GET OUT!
                </h1>
                <div className="flex justify-center gap-4">
                   <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.3 }} className="text-6xl">😡</motion.span>
                   <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.3, delay: 0.1 }} className="text-6xl">💢</motion.span>
                   <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.3, delay: 0.2 }} className="text-6xl">🚫</motion.span>
                </div>
                <p className="text-2xl font-bold text-slate-800 bg-white/80 px-8 py-2 rounded-full inline-block backdrop-blur-sm border-2 border-red-500">
                  This is NOT for you!
                </p>
              </div>
            </motion.div>

            {/* Red Flash Overlay */}
            <motion.div
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute inset-0 bg-red-600 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating background elements for the login state */}
      {!isAngry && (
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              initial={{ 
                x: Math.random() * 100 + "vw", 
                y: "110vh" 
              }}
              animate={{ 
                y: "-10vh",
                x: (Math.random() * 100) + "vw"
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              <Heart size={Math.random() * 40 + 20} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
