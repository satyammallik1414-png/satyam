"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Home, Gift, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Promise() {
  const { toast } = useToast();

  const handlePeek = () => {
    toast({
      title: "Patience, Princess! ❤️",
      description: "This final surprise is locked by a magical spell that only breaks at midnight on August 10th.",
      duration: 5000,
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-slate-950 text-white selection:bg-primary/50 overflow-y-auto">
      <div className="max-w-3xl w-full text-center space-y-8 md:space-y-12 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-8 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
          <Heart className="text-primary w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-8 relative z-10" fill="currentColor" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-6 md:space-y-8 px-2"
        >
          <h2 className="text-2xl md:text-5xl font-bold italic tracking-wide text-primary/80">My Forever Promise</h2>
          
          <div className="space-y-4 md:space-y-6 text-lg md:text-2xl font-light leading-relaxed text-slate-300">
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
          className="pt-8 md:pt-12 border-t border-white/10"
        >
          <div className="text-xl md:text-2xl font-serif italic text-primary">
            <p className="mb-1 md:mb-2">Forever Yours,</p>
            <p className="text-2xl md:text-4xl font-bold not-italic">Galu, Baby ❤️</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1 }}
          className="pt-8 md:pt-16 px-2"
        >
          <div className="relative group p-6 md:p-8 rounded-3xl border border-primary/30 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-xl">❤️</span>
            </div>
            
            <div className="relative z-10 space-y-4">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(209,64,180,0.4)]"
              >
                <Gift className="text-white w-8 h-8 md:w-10 md:h-10" />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white">The Midnight Secret</h3>
              <p className="text-slate-400 text-xs md:text-sm max-w-xs mx-auto">
                There's one more surprise waiting for you, but it's guarded by time itself...
              </p>
              
              <Button 
                onClick={handlePeek}
                variant="outline" 
                className="rounded-full mt-2 md:mt-4 gap-2 border-primary/50 text-primary hover:bg-primary/10 transition-all text-xs md:text-sm"
              >
                <Sparkles size={14} /> Try to Peek
              </Button>
            </div>

            <div className="absolute -bottom-10 -left-10 w-32 md:w-40 h-32 md:h-40 bg-primary/10 blur-[50px] rounded-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6 }}
          className="pt-8 md:pt-12"
        >
          <Link href="/">
            <Button variant="outline" className="rounded-full gap-2 border-primary/30 text-primary/70 hover:text-primary hover:border-primary/60 hover:bg-primary/10 text-xs md:text-sm">
              <Home size={16} /> Back to Start
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-8 text-white/20 text-[10px] md:text-xs uppercase tracking-[0.2em]">
        Galu, Baby &copy; {new Date().getFullYear()}
      </div>
    </main>
  );
}
