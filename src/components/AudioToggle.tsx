
"use client";

import { useState, useRef } from "react";
import { Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        // Fallback for browser blocking auto-play
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/audio/2022/04/12/audio_03d9735d56.mp3"
      />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-14 h-14 bg-white/90 backdrop-blur-md border-primary/30 shadow-[0_8px_32px_rgba(209,64,180,0.2)] hover:shadow-[0_8px_32px_rgba(209,64,180,0.4)] transition-all text-primary relative overflow-hidden group"
          onClick={toggleAudio}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
              >
                <Music className="w-6 h-6 animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ opacity: 0, rotate: 180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -180 }}
              >
                <Music2 className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {isPlaying && (
            <motion.div 
              className="absolute inset-0 bg-primary/5"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white px-4 py-2 rounded-xl shadow-xl border border-primary/10 whitespace-nowrap text-xs font-medium text-primary pointer-events-none"
          >
            Play Birthday Music? 🎵
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
