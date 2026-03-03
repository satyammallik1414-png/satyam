
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, CalendarHeart } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoveLetter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const letterContent = `My Dearest,

I couldn't wait until August 10th to start celebrating the beautiful soul that you are. One single day simply isn't enough to honor the person who makes every second of my life feel like a gift.

From the moment we first met, my life has been painted with colors I never knew existed. You are the gentle melody in my chaos, the warmth in my winters, and the bright morning sun that makes every day worth waking up for.

This letter is the first step in our early celebration. I want you to feel loved not just on your birthday, but in every moment leading up to it. I promise to hold your hand through every sunset and be your strength in every storm. You aren't just my girlfriend; you're my best friend, my soulmate, and my home.

Consider this my advance promise: I will be right there with you when the clock strikes midnight on the 10th, but until then, I'll be reminding you every day why you mean the world to me.

Happy Early Birthday, my love. Let the countdown to your special day begin.

Forever yours.`;

  return (
    <main className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative bg-pink-50/50">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [-20, -100],
              x: [0, (Math.random() - 0.5) * 50]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute text-primary/30"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          >
            <Sparkles size={Math.random() * 10 + 5} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-2 text-primary font-medium bg-primary/10 px-6 py-2 rounded-full border border-primary/20 backdrop-blur-sm shadow-sm"
      >
        <CalendarHeart size={18} />
        <span>Starting your celebration early...</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full love-letter-paper p-8 sm:p-16 rounded-sm shadow-2xl relative z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg border border-primary/10">
          <Sparkles className="text-primary" />
        </div>
        
        <div className="font-serif text-lg sm:text-xl text-slate-700 space-y-6">
          <TypewriterText text={letterContent} delay={35} />
        </div>

        <div className="mt-12 flex justify-end">
          <div className="text-right">
            <p className="font-serif italic text-muted-foreground">With all my love,</p>
            <p className="font-bold text-xl text-primary mt-1">Eternal Bloom</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-12 z-20"
      >
        <Link href="/gallery">
          <Button 
            size="lg" 
            className="rounded-full px-10 py-7 gap-3 shadow-xl hover:scale-105 transition-all bg-primary hover:bg-primary/90 text-white"
          >
            See Our Memories <Camera size={20} />
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
