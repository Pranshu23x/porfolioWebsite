"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CanvasRevealEffect } from "@/components/ui/sign-in-flow-1";

interface HeroProps {
  name: string;
  tagline: string;
  about: string;
}

export default function Hero({ name, tagline, about }: HeroProps) {
  const displayNames = ["PRANSHU", "KUMAR"];

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-black text-white overflow-hidden relative selection:bg-white selection:text-black">
      {/* Background Dots - Full Page Integration */}
      <div className="absolute inset-0 z-0">
        <CanvasRevealEffect 
          dotSize={6} 
          animationSpeed={3} 
          colors={[[255, 255, 255]]}
          showGradient={true}
        />
      </div>

      {/* Content Columns */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-24 relative z-10 bg-transparent overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4 md:space-y-8 leading-[0.85]">
            {displayNames.map((n, i) => (
              <h1 key={i} className="text-[12vw] md:text-[8vw] font-extralight tracking-tight uppercase">
                {n}
              </h1>
            ))}
          </div>
          <p className="text-lg md:text-xl font-light text-white/60 lowercase tracking-wide">
            {tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-sm md:text-base font-light text-white/30"
        >
          <p>For research inquiries, email me at</p>
          <a href="mailto:pranshu@example.com" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">
            pranshu@example.com
          </a>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 md:pr-0 relative z-10 bg-transparent">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="bg-black/80 rounded-l-[60px] p-10 md:p-24 border-l-2 border-y-2 border-white space-y-12 w-full ml-auto shadow-2xl"
          style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.05)" }}
        >
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xs tracking-[0.2em] font-light text-white/40 uppercase">
                About Me
              </h2>
            </div>
            
            <div className="text-lg md:text-xl font-light text-white/80 leading-relaxed font-sans whitespace-pre-line">
              {about}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Noise layer over everything including dots for texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
    </section>
  );
}
