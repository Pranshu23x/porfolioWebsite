"use client";

import React from "react";
import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer({ name }: { name: string }) {
  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/Pranshu23x",
      icon: <Github className="w-6 h-6" />
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/pranshukumar23/",
      icon: <Linkedin className="w-6 h-6" />
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/pranshu23x/",
      icon: <Instagram className="w-6 h-6" />
    }
  ];

  const resumeUrl = "https://drive.google.com/file/d/1eueKIfdz2RhD6s_eyguFPo-EqMDJwzY0/view";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-24 md:py-48 px-6 md:px-12 selection:bg-white selection:text-black">
      <div className="max-w-[1700px] mx-auto w-full space-y-32">
        
        {/* Connect Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-end">
          <div className="space-y-8">
            <h2 className="text-[8vw] md:text-[6vw] font-extralight uppercase leading-[0.85] tracking-tighter">
              Let&apos;s <br />
              <span className="text-white/20 italic font-serif">Connect</span>
            </h2>
            <p className="text-xl md:text-3xl font-light text-white/40 leading-relaxed max-w-xl">
              I am eager to connect and build something impactful. Whether it&apos;s systems engineering or agentic AI — let&apos;s talk.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-12">
            {/* Social Icons Table */}
            <div className="flex flex-wrap gap-8 items-center">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500"
                >
                  <div className="p-4 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                    {social.icon}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-mono hidden md:block">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Back to top toggle */}
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors group"
            >
              Back to Top
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:-translate-y-1 transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Global Signature & Resume Final CTA */}
        <div className="pt-24 border-t border-white/5 space-y-24">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <h3 className="text-5xl md:text-7xl font-serif tracking-tighter uppercase italic text-white/90">
              {name}
            </h3>
            
            <Link 
              href={resumeUrl}
              target="_blank"
              className="px-12 py-5 bg-white text-black text-xs font-mono font-bold uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Resume
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <p className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">
                Current Location
              </p>
              <p className="text-xs text-white/60">Bhubaneswar, IN / UTC+5:30</p>
            </div>
            
            <div className="text-[10px] font-mono tracking-[0.2em] text-white/10 uppercase">
              © {new Date().getFullYear()} / {name} / ALL SYSTEMS NOMINAL
            </div>

            <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-white/20">
              <span>Availability: Q3 2025</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
