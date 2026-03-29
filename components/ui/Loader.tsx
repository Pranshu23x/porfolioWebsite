"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRELOAD_IMAGES = [
  "https://i.ibb.co/jZf1Jkbj/image.png",
  "https://i.ibb.co/Wp7xPh55/image.png",
  "https://i.ibb.co/QFstgjqk/image.png"
];

export default function Loader({ finishLoading }: { finishLoading: () => void }) {
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // 1. Initial Progress Timer (Visual Anchor)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 15); // Faster baseline progress

    // 2. Image Preloading Logic
    const preloadImages = async () => {
      const promises = PRELOAD_IMAGES.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();

    return () => clearInterval(timer);
  }, []);

  // 3. Finalization logic: Only finish once progress is 100 AND images are ready
  useEffect(() => {
    if (progress === 100 && imagesLoaded) {
      setTimeout(finishLoading, 400);
    }
  }, [progress, imagesLoaded, finishLoading]);

  const text = "Hi, Its Pranshu";
  const words = text.split(" ");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden font-sans"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {/* Main Text Animation */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: idx * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-8xl font-serif italic font-light text-white tracking-tighter"
            >
              {word}
            </motion.span>
          ))}
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] w-32 bg-white/20 origin-left"
        />
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/10 mt-4">
          Optimizing Assets
        </p>
      </div>

      {/* Percentage Counter */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 flex items-end">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-7xl md:text-9xl font-sans font-black text-white/90 tabular-nums tracking-tighter"
        >
          {progress}<span className="text-4xl md:text-6xl text-white/20">%</span>
        </motion.span>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </motion.div>
  );
}
