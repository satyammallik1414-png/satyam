
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingHearts } from "@/components/FloatingHearts";
import { BirthdayCountdown } from "@/components/BirthdayCountdown";
import { AudioToggle } from "@/components/AudioToggle";
import { Button } from "@/components/ui/button";
import { Gift, CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <FloatingHearts />
      <AudioToggle />
      
      <div className="z-10 text-center max-w-4xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <CalendarDays size={16} />
            <span>Marking the Calendar for August 10</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-glow animate-gradient-x leading-tight">
            An Advance Wish <br /> For My Princess ❤️
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-3xl font-light text-muted-foreground"
          >
            Counting down the seconds until we celebrate the <span className="text-primary font-semibold underline decoration-accent/30 underline-offset-8 italic">most incredible soul</span>.
          </motion.p>
        </motion.div>

        <div className="flex justify-center">
          <BirthdayCountdown />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link href="/love-letter">
            <Button size="lg" className="rounded-full px-12 py-8 text-xl group relative overflow-hidden transition-all hover:scale-105 hover:shadow-primary/50 hover:shadow-2xl">
              <span className="relative z-10 flex items-center gap-2">
                Begin the Early Surprise <Gift className="group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 text-muted-foreground/60 text-sm italic"
      >
        Your birthday journey starts early because one day isn't enough to celebrate you.
      </motion.footer>
    </main>
  );
}
