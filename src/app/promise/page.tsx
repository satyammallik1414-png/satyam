"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";

export default function Promise() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white selection:bg-primary/50">
      <div className="max-w-3xl w-full text-center space-y-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-8 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
          <Heart className="text-primary w-16 h-16 mx-auto mb-8 relative z-10" fill="currentColor" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold italic tracking-wide text-primary/80">My Forever Promise</h2>
          
          <div className="space-y-6 text-xl md:text-2xl font-light leading-relaxed text-slate-300">
            <p>
              I promise to listen to your stories even when they're long,
              to hold you close when you feel small,
              and to celebrate your wins as if they were my own.
            </p>
            <p>
              I promise to be the person who always believes in you,
              the shoulder you can always lean on,
              and the heart that will never stop loving you.
            </p>
            <p>
              Through every laugh, every tear, and every beautiful milestone,
              I am yours. Yesterday, today, and for every tomorrow we are yet to see.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="pt-12 border-t border-white/10"
        >
          <div className="text-2xl font-serif italic text-primary">
            <p className="mb-2">Forever Yours,</p>
            <p className="text-4xl font-bold not-italic">Galu, Baby ❤️</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="pt-12"
        >
          <Link href="/">
            <Button variant="outline" className="rounded-full gap-2 border-primary/30 text-primary/70 hover:text-primary hover:border-primary/60 hover:bg-primary/10">
              <Home size={18} /> Back to Start
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 text-white/20 text-xs uppercase tracking-[0.2em]">
        Galu, Baby &copy; {new Date().getFullYear()}
      </div>
    </main>
  );
}
