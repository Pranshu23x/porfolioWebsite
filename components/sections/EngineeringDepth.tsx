"use client";

import React from "react";
import { motion } from "framer-motion";

interface DepthPoint {
  title: string;
  description: string;
}

interface EngineeringDepthProps {
  points: DepthPoint[];
}

export default function EngineeringDepth({ points }: EngineeringDepthProps) {
  // Hardcoded for now if not parsed correctly, but normally this would come from markdown.
  const depthPoints = points.length > 0 ? points : [
    { title: "Ownership", description: "I don’t just write features. I take responsibility for outcomes." },
    { title: "Systems Thinking", description: "I design for scale, modularity, and maintainability from day one." },
    { title: "Execution Speed", description: "I ship fast, iterate faster, and prioritize feedback over perfection." },
    { title: "Practical AI", description: "I use AI where it adds leverage — not where it adds hype." }
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-white/[0.02]">
      <div className="flex flex-col md:flex-row gap-24 mb-16">
        <div className="flex-1">
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Engineering Principles</h2>
          <p className="text-xl text-white/40 leading-relaxed max-w-lg">
            Building software is a game of leverage. Here is how I think about systems.
          </p>
        </div>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12">
          {depthPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-serif">{point.title}</h3>
              <p className="text-white/40 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
