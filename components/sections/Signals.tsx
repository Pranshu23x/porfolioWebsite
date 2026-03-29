"use client";

import React from "react";
import { motion } from "framer-motion";

interface SignalsProps {
  signals: string[];
}

export default function Signals({ signals }: SignalsProps) {
  return (
    <section className="py-24 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {signals.map((signal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col gap-4 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-4xl">{signal.split(" ")[0]}</span>
            <span className="text-xl md:text-2xl font-serif text-white/90 leading-tight">
              {signal.split(" ").slice(1).join(" ")}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
