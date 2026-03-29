"use client";

import React from "react";
import { motion } from "framer-motion";

interface Point {
  title: string;
  description: string;
}

interface HireabilityProps {
  points: Point[];
  expectations: string[];
}

export default function Hireability({ points, expectations }: HireabilityProps) {
  return (
    <section className="py-48 px-6 md:px-24">
      <div className="max-w-4xl space-y-32">
        <h2 className="text-6xl md:text-9xl font-serif mb-16 leading-none">
          Why you should hire me
        </h2>

        <div className="space-y-16">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12"
            >
              <span className="text-4xl md:text-5xl font-mono text-white/20 italic">0{index + 1}</span>
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-serif">{point.title}</h3>
                <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-12 md:p-16 rounded-[3rem] border border-white/10 bg-white/[0.02] space-y-12">
          <h3 className="text-3xl md:text-5xl font-serif">What You Can Expect</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl text-white/60">
            {expectations.map((exp, index) => (
              <li key={index} className="flex gap-4 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                {exp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
