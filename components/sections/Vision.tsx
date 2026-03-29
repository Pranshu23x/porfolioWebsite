"use client";

import React from "react";
import { motion } from "framer-motion";

interface VisionProps {
  focus: string;
  longTerm: string;
}

export default function Vision({ focus, longTerm }: VisionProps) {
  if (!focus && !longTerm) return null;

  return (
    <section className="py-48 px-6 md:px-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="max-w-4xl space-y-24">
        <div className="space-y-8">
          <span className="text-xs font-mono text-white/30 uppercase tracking-[0.4em]">Current Direction</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white/90 leading-tight">
            Building systems that reduce friction between <span className="text-white italic">{focus}</span>.
          </h2>
        </div>

        <div className="space-y-8 max-w-2xl">
          <span className="text-xs font-mono text-white/30 uppercase tracking-[0.4em]">Long-Term Vision</span>
          <p className="text-2xl md:text-4xl font-serif text-white/40 leading-relaxed">
            {longTerm || "The future of engineering is leverage. Building for a world where intent translates to execution through intelligent systems."}
          </p>
        </div>
      </div>
    </section>
  );
}
