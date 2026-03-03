
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReasonCard } from "@/components/ReasonCard";
import { PartyPopper, Heart } from "lucide-react";

const REASONS = [
  "Your smile brightens even my darkest days instantly.",
  "The way you care for the smallest details in our life.",
  "Your laugh is my favorite soundtrack of all time.",
  "You challenge me to be the best version of myself.",
  "How safe and at home I feel when I'm in your arms.",
  "Your unwavering kindness towards everyone you meet.",
  "The way your eyes sparkle when you're talking about dreams.",
  "How you know exactly what I'm thinking without a word.",
  "Your incredible strength and grace under pressure.",
  "The beautiful future I see every time I look at you."
];

export default function Reasons() {
  return (
    <main className="min-h-screen py-20 px-6 bg-gradient-to-br from-secondary/40 via-background to-primary/10">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-heart-beat">
              <Heart className="text-primary" size={32} fill="currentColor" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary animate-glow">Reasons Why I Love You</h2>
          <p className="text-muted-foreground text-lg">Just a few of the million things that make you special...</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, idx) => (
            <ReasonCard key={idx} reason={reason} index={idx} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center pt-12 space-y-6"
        >
          <p className="text-primary font-medium text-lg italic animate-pulse">And millions more I discover every single day...</p>
          <Link href="/surprise">
            <Button size="lg" className="rounded-full px-12 py-8 text-xl gap-3 shadow-2xl hover:scale-105 transition-all bg-gradient-to-r from-primary to-accent border-none group">
              Ready for the Surprise? <PartyPopper className="group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
