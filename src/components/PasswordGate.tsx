
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RandomHeart {
  id: number;
  x: string;
  size: number;
  duration: number;
  delay: number;
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [backgroundHearts, setBackgroundHearts] = useState<RandomHeart[]>([]);
  const { toast } = useToast();
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const hearts = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      size: Math.random() * 20 + 10,
      duration: 10 + Math.random() * 10,
      delay: i * 2,
    }));
    setBackgroundHearts(hearts);
  }, []);

  const handleVerify = () => {
    if (password.toLowerCase() === "iloveugalu") {
      setIsAuthorized(true);
      toast({
        title: "Welcome back, my love! ❤️",
        description: "Your magical journey awaits.",
      });
    } else {
      setIsRejected(true);
      if (errorAudioRef.current) {
        errorAudioRef.current.currentTime = 0;
        errorAudioRef.current.play().catch(e => console.log("Audio failed", e));
      }
      
      // Reset after 4 seconds
      setTimeout(() => {
        setIsRejected(false);
        setPassword("");
      }, 4000);
    }
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background p-6 overflow-hidden">
      {/* Hidden error audio */}
      <audio 
        ref={errorAudioRef} 
        src="https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a7351d.mp3" 
      />

      <AnimatePresence mode="wait">
        {isRejected ? (
          <motion.div
            key="rejected"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-center space-y-8 z-20"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-9xl"
            >
              😡
            </motion.div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-destructive uppercase tracking-tighter">
                GET OUT FROM THIS WEBSITE!
              </h2>
              <p className="text-2xl font-medium text-muted-foreground italic">
                THIS IS NOT FOR YOU!
              </p>
            </div>
            <div className="flex justify-center gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ delay: i * 0.1, repeat: Infinity }}
                  className="text-4xl"
                >
                  😤
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full space-y-8 text-center relative z-10"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/30 blur-[120px]" />
            </div>

            <div className="relative inline-block mb-4">
              <div className="absolute -inset-6 bg-primary/10 blur-2xl rounded-full animate-pulse" />
              <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border border-primary/10 relative z-10 mx-auto">
                <Lock className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-primary tracking-tight">Our Private World</h1>
              <p className="text-muted-foreground text-lg italic">Enter the secret word to unlock your birthday journey.</p>
            </div>

            <div className="space-y-4 pt-4">
              <Input 
                type="password"
                placeholder="Type the secret word..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="text-center text-xl h-16 rounded-2xl border-primary/20 bg-white/50 backdrop-blur-sm focus-visible:ring-primary shadow-inner"
              />
              <Button 
                onClick={handleVerify}
                className="w-full rounded-2xl py-8 text-xl font-bold gap-3 shadow-[0_10px_30px_rgba(209,64,180,0.3)] hover:shadow-[0_15px_40px_rgba(209,64,180,0.4)] transition-all hover:scale-[1.02] active:scale-95"
              >
                Unlock the Magic <Heart size={20} fill="currentColor" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] pt-8">
              A special surprise for a special soul
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Hearts/Particles (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {mounted && backgroundHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-primary"
            initial={{ y: "100vh", x: heart.x }}
            animate={{ y: "-10vh" }}
            transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
