"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/dist/Observer";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Observer);

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

export default function ProjectsSlider({ projects }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatingRef = useRef(false);
  
  // Refs for elements to animate
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || projects.length === 0) return;

    // Initial setup
    const sections = sectionsRef.current;
    const outerWrappers = outerWrappersRef.current;
    const innerWrappers = innerWrappersRef.current;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
    gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });

    function gotoSection(index: number, direction: number) {
      if (index < 0 || index >= projects.length || animatingRef.current) return;
      
      animatingRef.current = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power2.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        }
      });

      // Outgoing section
      const prevIndex = currentIndex;
      gsap.set(sections[prevIndex], { zIndex: 0 });
      tl.to(outerWrappers[prevIndex], { yPercent: -100 * dFactor }, 0)
        .to(innerWrappers[prevIndex], { yPercent: 100 * dFactor }, 0)
        .set(sections[prevIndex], { autoAlpha: 0 });

      // Incoming section
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
          yPercent: i => i ? -100 * dFactor : 100 * dFactor
        }, { 
          yPercent: 0 
        }, 0);

      setCurrentIndex(index);
    }

    const observer = Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animatingRef.current && currentIndex > 0 && gotoSection(currentIndex - 1, -1),
      onUp: () => !animatingRef.current && currentIndex < projects.length - 1 && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: false // Allow scrolling out of the container
    });

    return () => {
      observer.kill();
    };
  }, [projects, currentIndex]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-black overflow-hidden selection:bg-white selection:text-black z-50"
    >
      {projects.map((project, i) => (
        <div
          key={i}
          ref={(el) => { if (el) sectionsRef.current[i] = el; }}
          className="absolute inset-0 invisible h-full w-full"
        >
          <div 
            ref={(el) => { if (el) outerWrappersRef.current[i] = el; }}
            className="outer absolute inset-0 h-full w-full overflow-hidden"
          >
            <div 
              ref={(el) => { if (el) innerWrappersRef.current[i] = el; }}
              className="inner absolute inset-0 h-full w-full overflow-hidden"
            >
              <div className="flex h-full w-full p-8 md:p-24 bg-[#050505]">
                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full h-full items-center">
                  
                  {/* Left: Huge Title */}
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block">
                      Project {i + 1} / {projects.length}
                    </span>
                    <h2 
                      className="text-7xl md:text-[10vw] font-serif leading-[0.85] italic tracking-tighter"
                    >
                      {project.title.split(" ").map((word, idx) => (
                        <span key={idx} className="block overflow-hidden">
                          <span className="inline-block">{word}</span>
                        </span>
                      ))}
                    </h2>
                    {project.isFlagship && (
                      <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white/40">
                        Flagship Deployment
                      </span>
                    )}
                  </div>

                  {/* Right: Technical Spec */}
                  <div className="space-y-12 max-w-xl">
                    <div className="space-y-4">
                      <p className="text-xs uppercase text-white/20 tracking-widest font-mono">The Problem</p>
                      <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed font-sans">
                        {project.problem}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs uppercase text-white/20 tracking-widest font-mono">Real-World Outcome</p>
                      <p className="text-2xl md:text-3xl text-white font-medium italic font-serif">
                        &quot;{project.impact}&quot;
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-8">
                      {project.techStack.map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {projects.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "w-1 h-8 transition-colors duration-500",
              currentIndex === i ? "bg-white" : "bg-white/10"
            )}
          />
        ))}
      </div>
    </section>
  );
}
