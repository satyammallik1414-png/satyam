
"use client";

import { useState, useRef } from "react";
import { Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm border-primary/20 shadow-lg hover:scale-110 transition-transform text-primary"
        onClick={toggleAudio}
      >
        {isPlaying ? <Music className="animate-spin-slow" /> : <Music2 />}
      </Button>
    </div>
  );
}
