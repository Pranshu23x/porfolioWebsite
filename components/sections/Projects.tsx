"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  status?: string;
  isFlagship?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#050505]/80 backdrop-blur-3xl p-12 md:p-20 transition-all duration-1000",
        project.isFlagship ? "col-span-full ring-1 ring-white/20 hover:ring-white/40" : "hover:border-white/30"
      )}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 transition-opacity duration-1000 group-hover:opacity-100 opacity-30" />
      
      {project.isFlagship && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}

      <div className="relative z-10 flex flex-col md:flex-row gap-16 md:items-start">
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {project.isFlagship && (
                <span className="px-4 py-1 rounded-full bg-white text-[10px] text-black font-mono font-bold uppercase tracking-[0.2em]">
                  Flagship Product
                </span>
              )}
              {project.status && (
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                  {project.status.replace(/Status:\s*/, "")}
                </span>
              )}
            </div>
            
            <h3 className={cn(
              "font-serif leading-none transition-transform duration-700 group-hover:translate-x-2",
              project.isFlagship ? "text-6xl md:text-9xl" : "text-5xl md:text-7xl"
            )}>
              {project.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">The Problem</span>
              <p className="text-xl text-white/50 leading-relaxed font-light">{project.problem}</p>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Execution</span>
              <p className="text-xl text-white/90 leading-relaxed font-medium">{project.solution}</p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Current Impact</span>
            <p className="text-2xl md:text-3xl text-white/70 italic font-serif leading-relaxed">
              &quot;{project.impact}&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between self-stretch">
          <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
            <ArrowUpRight className="w-8 h-8" />
          </button>
          
          <div className="flex flex-col items-end gap-3 mt-12 md:mt-0">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-[10px] font-mono text-white/30 text-right uppercase tracking-[0.1em]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-48 px-6 md:px-24 space-y-48 overflow-hidden">
      <div className="max-w-4xl">
        <span className="text-xs font-mono text-white/30 uppercase tracking-[0.4em] mb-8 block">Selected Systems</span>
        <h2 className="text-6xl md:text-9xl font-serif mb-12 leading-none">High leverage execution.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1920px] mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
