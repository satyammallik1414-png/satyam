
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartyPopper, Heart, Star, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Surprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    triggerConfetti();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 z-0">
        {mounted && stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
            className="absolute text-white/20"
            style={{ left: star.left, top: star.top }}
          >
            <Star size={star.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="z-10 text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Almost There...</h2>
            <Button
              onClick={handleReveal}
              size="lg"
              className="rounded-full w-40 h-40 flex flex-col gap-2 text-xl font-bold bg-primary hover:bg-primary/90 shadow-[0_0_50px_rgba(209,64,180,0.5)] border-4 border-white/20"
            >
              <PartyPopper size={48} />
              Open!
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center space-y-12 flex flex-col items-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="text-8xl sm:text-9xl mb-8"
              >
                🎂
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl"
              >
                🕯️
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-glow leading-tight">
                I Love You Forever! ❤️
              </h1>
              <p className="text-white/80 text-xl md:text-2xl font-light italic">
                You are my greatest adventure and my favorite surprise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="pt-8"
            >
              <Link href="/promise">
                <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/10 rounded-full px-8 py-6 gap-2 border border-white/20">
                  A Final Promise <Sparkles size={18} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts only in revealed state */}
      {isRevealed && (
        <div className="fixed inset-0 pointer-events-none">
          {mounted && Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 0] }}
              transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 10 }}
              className="absolute text-primary/40"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <Heart size={Math.random() * 30 + 10} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
