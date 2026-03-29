"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundGrid from "@/components/background/BackgroundGrid";
import Hero from "@/components/sections/Hero";
import Skillset from "@/components/sections/Skillset";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/ui/Loader";
import { MarkdownContent } from "@/lib/markdown";

export default function PortfolioContent({ content }: { content: MarkdownContent }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative min-h-screen selection:bg-white selection:text-black"
      >
        {/* Background stays for entire experience */}
        <BackgroundGrid />

        <div className="relative">
          {/* Parallax Stack 1: Hero */}
          <div className="sticky top-0 z-0 h-screen w-full">
            <Hero
              name={content.hero.name}
              tagline={content.hero.tagline}
              about={content.about}
            />
          </div>

          {/* Stacking Content Container */}
          <div className="relative z-10">
            
            {/* 1. Architecture & Core Signals (MagicBento) - Natural Scroll for Clarity */}
            <div className="relative z-0 min-h-[150vh] bg-black">
              <Skillset skillset={content.skillset} />
            </div>
            
            {/* 3. My Projects (Cinematic Row Gallery) - Slides over as a high-fidelity layer */}
            <div className="relative z-10 bg-black min-h-screen border-t border-white/10 shadow-[0_-100px_200px_rgba(0,0,0,1)]">
              <FeaturedProjects />
            </div>

            {/* Footer - Final Landing Point */}
            <div className="relative z-20 bg-black border-t border-white/5">
              <Footer
                name={content.footer.name}
                label={content.footer.label}
                links={content.footer.links}
              />
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
}
