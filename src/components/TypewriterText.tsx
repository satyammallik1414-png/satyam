
"use client";

import { useEffect, useState } from "react";

export function TypewriterText({ text, delay = 30 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return (
    <p className="whitespace-pre-wrap leading-relaxed">
      {displayedText}
      {index < text.length && (
        <span className="inline-block w-1 h-5 bg-primary ml-1 animate-pulse" />
      )}
    </p>
  );
}
