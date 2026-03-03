
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Gallery() {
  return (
    <main className="min-h-screen py-16 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary animate-glow">Our Story in Frames</h2>
          <p className="text-muted-foreground text-lg italic">Every moment with you is a treasure I'll keep forever.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PlaceHolderImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg group-hover:shadow-primary/20 group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={img.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <p className="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {img.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary/80 mt-2">
                        <Heart size={16} fill="currentColor" />
                        <span className="text-sm text-white/80">Sweetest Memory</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-1 bg-white/10 backdrop-blur-xl border-none">
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden">
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4 text-center text-white">
                    <p className="text-xl font-medium">{img.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center pt-10"
        >
          <Link href="/reasons">
            <Button size="lg" className="rounded-full px-12 py-7 gap-3 shadow-xl hover:scale-105 group">
              Why I Love You <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
