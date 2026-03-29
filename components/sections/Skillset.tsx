"use client";

import React from "react";
import MagicBento from "@/components/ui/MagicBento";

interface SkillsetProps {
  skillset: {
    focus: string[];
    techStack: string[];
    infrastructure: string[];
    currentDirection: string[];
  };
}

export default function Skillset({ skillset }: SkillsetProps) {
  const cards = [
    {
      label: "Institutional Signal",
      title: "HackHarvard 2025",
      description: "Selected among top engineering talent. Building high-performance software at the intersection of intelligence and systems.",
      typeClassName: "magic-bento-card--primary"
    },
    {
      label: "Engineering Depth",
      title: "The Tech Stack",
      description: (
        <div className="flex flex-col h-full justify-between mt-4">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">Focus</p>
              <p className="text-sm">Backend, AI Systems, Dev Tools</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">Languages</p>
              <p className="text-sm">C++, TS/JS, Node.js</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">Architecture</p>
              <p className="text-sm">PostgreSQL, AWS, Git</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs text-white/40 italic">Production backends managed on AWS — Scalability & Ownership.</p>
          </div>
        </div>
      ),
      typeClassName: "magic-bento-card--secondary"
    },
    {
      label: "Qualification",
      title: "Education",
      description: (
        <div className="flex flex-wrap gap-x-16 gap-y-4 items-center">
          <div className="space-y-1">
            <p className="text-xl font-light">B.Tech CSE, KIIT (2024–2028)</p>
            <p className="text-xs text-white/20 uppercase tracking-widest">Enrollment Active</p>
          </div>
          <div className="flex gap-12 border-l border-white/10 pl-16">
            <div>
              <p className="text-[10px] uppercase text-white/30 mb-1">CGPA</p>
              <p className="text-3xl font-serif">8.56</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-white/30 mb-1">Class 12</p>
              <p className="text-3xl font-serif">92%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-white/30 mb-1">Class 10</p>
              <p className="text-3xl font-serif">96%</p>
            </div>
          </div>
        </div>
      ),
      typeClassName: "magic-bento-card--tertiary"
    }
  ];

  return (
    <section className="relative bg-black py-24 md:py-48 selection:bg-white selection:text-black min-h-screen flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
        <div className="mb-16 md:mb-24 px-4">
          <h2 className="text-[8vw] md:text-[5vw] font-extralight uppercase tracking-tighter leading-[0.85] text-white">
            Architecture <br /> 
            <span className="text-white/20 italic font-serif">& Core Signals</span>
          </h2>
        </div>

        <MagicBento 
          cards={cards}
          glowColor="132, 0, 255"
          spotlightRadius={400}
          enableMagnetism={true}
          enableTilt={false}
          clickEffect={true}
          particleCount={16}
        />
      </div>
    </section>
  );
}
