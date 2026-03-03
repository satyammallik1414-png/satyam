
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ReasonCardProps {
  reason: string;
  index: number;
}

export function ReasonCard({ reason, index }: ReasonCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group perspective-1000 w-full h-48 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-md group-hover:shadow-primary/20 group-hover:shadow-lg transition-all">
          <Heart className="text-primary/40 mb-3 group-hover:scale-125 transition-transform" />
          <span className="text-primary font-medium text-lg">Reason #{index + 1}</span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-gradient-to-br from-primary/90 to-accent/90 text-white rounded-2xl shadow-xl">
          <p className="text-center font-medium leading-relaxed italic">
            "{reason}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
