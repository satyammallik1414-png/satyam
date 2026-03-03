
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user was previously authorized in this session
    const auth = localStorage.getItem("site_auth");
    if (auth === "true") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleVerify = () => {
    if (password.toLowerCase() === "iloveugalu") {
      localStorage.setItem("site_auth", "true");
      setIsAuthorized(true);
      toast({
        title: "Welcome back, my love! ❤️",
        description: "Your magical journey awaits.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "That's not our secret word! Try again, Princess. ❤️",
      });
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Heart className="text-primary animate-pulse" size={48} fill="currentColor" />
      </div>
    );
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background p-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/30 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 text-center relative z-10"
      >
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
    </div>
  );
}
