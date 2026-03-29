"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ProjectRowProps {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  outcome?: string;
  isFlagship?: boolean;
  index: number;
  url: string;
  imageUrl: string;
}

const ProjectRow = ({ 
  title, 
  tagline, 
  problem, 
  solution, 
  outcome, 
  isFlagship,
  index,
  url,
  imageUrl
}: ProjectRowProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1, ease: "easeOut" }}
    className={cn(
      "group relative w-full border-t border-white/10 pt-24 pb-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center",
      index === 0 && "border-t-0 pt-0"
    )}
  >
    {/* Left: Content */}
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {isFlagship && (
            <span className="px-3 py-0.5 bg-white text-[10px] text-black font-mono font-bold uppercase tracking-[0.2em] rounded-full">
              Flagship signal
            </span>
          )}
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
            Project 0{index + 1}
          </span>
          <span className="px-5 py-2.5 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-white/50 rounded-full flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            Active Deployment: Click Heading or Image
          </span>
        </div>
        
        <div className="space-y-4">
          <Link href={url} target="_blank" className="block w-fit group/title">
            <h3 className="text-7xl md:text-9xl font-serif leading-none tracking-tighter group-hover/title:text-white transition-all duration-700 hover:translate-x-4">
              {title}
            </h3>
          </Link>
          <p className="text-sm md:text-base font-mono text-white/40 uppercase tracking-[0.2em]">
            {tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 max-w-xl">
        <div className="space-y-3">
          <span className="text-[10px] text-white/20 uppercase tracking-widest block font-mono">Problem</span>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed font-sans">
            {problem}
          </p>
        </div>
        <div className="space-y-3">
          <span className="text-[10px] text-white/20 uppercase tracking-widest block font-mono">Solution Thinking</span>
          <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed font-sans">
            {solution}
          </p>
        </div>
      </div>

      {outcome && (
        <div className="pt-8 flex items-center gap-6">
          <div className="w-12 h-[1px] bg-white/10" />
          <p className="text-2xl md:text-3xl font-light text-white/70 italic font-serif">
            &quot;{outcome}&quot;
          </p>
        </div>
      )}
    </div>

    {/* Right: Asset Area (Integrated Project Screenshot) */}
    <Link href={url} target="_blank" className="block group/asset">
      <div className="relative aspect-[16/10] w-full rounded-[40px] overflow-hidden bg-white/[0.03] border border-white/10 group-hover/asset:border-white/30 transition-all duration-700 shadow-2xl">
        {/* Background patterns/glows (visible before image loads) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
        
        {/* Actual Image */}
        <div className="absolute inset-0 p-4 md:p-8">
           <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/5">
              <Image 
                src={imageUrl} 
                alt={title}
                fill
                className="object-cover object-top group-hover/asset:scale-105 transition-transform duration-1000 grayscale-[20%] group-hover/asset:grayscale-0"
                unoptimized
              />
           </div>
        </div>

        {/* Subtle overlay accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </Link>
  </motion.div>
);

export default function FeaturedProjects() {
  return (
    <section className="bg-black py-24 md:py-48 px-6 md:px-12 selection:bg-white selection:text-black">
      <div className="max-w-[1700px] mx-auto w-full space-y-32">
        
        {/* Section Title */}
        <div className="space-y-8 max-w-4xl px-4">
          <h2 className="text-[10vw] md:text-[8vw] font-extralight uppercase leading-none tracking-tighter">
            My <br />
            <span className="text-white/20 font-serif">Projects</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/40 leading-relaxed max-w-xl">
            Engineering real-world systems with total ownership. Designed for users, optimized for impact.
          </p>
        </div>

        {/* Project Rows */}
        <div className="space-y-0">
          
          <ProjectRow
            title="Voyage"
            tagline="Agentic Job Optimization Suite"
            problem="Job markets are inefficient; ranking algorithms are opaque and high-agency candidates get filtered out."
            solution="Built an agentic AI system that automates job ranking and resume optimization based on real-world hiring signals."
            url="https://try-voyage.vercel.app/"
            imageUrl="https://i.ibb.co/jZf1Jkbj/image.png"
            isFlagship={true}
            index={0}
          />

          <ProjectRow
            title="RippleCode"
            tagline="DevTools Infrastructure"
            problem="Developer workflow friction and context switching."
            solution="Built a thing that converts entire repos into compressed XML so LLMs can actually understand them. Like giving AI glasses lol."
            url="https://www.ripplecode.site/"
            imageUrl="https://i.ibb.co/Wp7xPh55/image.png"
            outcome="250+ developers actively using it"
            index={1}
          />

          <ProjectRow
            title="AskTabs"
            tagline="Contextual Retrieval"
            problem="Retrieval Augmented Generation with poor document context awareness."
            solution="Chrome extension that lets you search and ask questions across all your open tabs. Uses Chrome's native AI APIs so your data never leaves your browser."
            url="https://chromewebstore.google.com/detail/asktabs/edgkopkoeamacnokbnknnlbahpijldhc?hl=en"
            imageUrl="https://i.ibb.co/QFstgjqk/image.png"
            outcome="Winner of Gemini Hackathon 2025"
            index={2}
          />

        </div>
      </div>
    </section>
  );
}
