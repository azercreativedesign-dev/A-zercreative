"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguageStore, Project } from "@/components/store/useLanguageStore"
import { X, ArrowUpRight, LayoutGrid, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function PortfolioSection() {
  const { t } = useLanguageStore()
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Map "All" based on language
  const allLabel = t.categories?.[0] || "All"

  const filteredProjects = activeCategory === allLabel || activeCategory === "All"
    ? t.projects 
    : t.projects.filter(p => p.category === activeCategory)

  // Block viewport scrolling when modal frame is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  // Support ESC keyboard layout to close dynamic modal safely
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="portfolio" className="py-24 bg-transparent text-white overflow-hidden relative z-10">
      <div className="container mx-auto px-6 lg:px-12 relative">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.5em] mb-8 bg-[#D4AF37]/5">
            <LayoutGrid size={12} />
            {t.visualArchive}
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
            {t.selectedTitle} <br />
            <span className="text-transparent italic" style={{ WebkitTextStroke: '1px #D4AF37' }}>
              {t.artifactsSubtitle}
            </span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-20">
          {t.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border cursor-pointer",
                activeCategory === category
                  ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105"
                  : "bg-transparent border-white/10 text-white/40 hover:border-[#D4AF37]/50 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative bg-[#090909] border border-white/[0.04] overflow-hidden transition-all duration-1000 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Asymmetric Framing Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-[#D4AF37] transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-[#D4AF37] transition-all duration-500" />

              <div className="relative overflow-hidden aspect-[4/5]">
                <img 
                  src={project.imageSrc} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                
                {/* Gradient Shroud Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-700">
                   <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.4em] mb-2.5">
                     {project.category}
                   </span>
                   <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white mb-6 leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                     {project.title}
                   </h3>
                   <div className="flex items-center gap-4 text-white/40">
                      <div className="h-px w-8 bg-[#D4AF37]/60 group-hover:w-12 transition-all duration-500" />
                      <span className="text-[9px] uppercase tracking-widest font-bold">
                        {t.caseStudy} 0{project.id}
                      </span>
                   </div>
                </div>

                {/* Micro Action Button Top-Right */}
                <div className="absolute top-6 right-6 w-11 h-11 bg-[#D4AF37] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-45 group-hover:rotate-0 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                   <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Modal with Framer Motion */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden">
            {/* BACKDROP LAYER: Explicitly handles close actions on both desktop and mobile taps.
              Using pointer-events-auto ensures mobile browsers treat this as an active clickable surface.
            */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out pointer-events-auto"
              onClick={() => setSelectedProject(null)}
              onTouchEnd={() => setSelectedProject(null)}
            />

            {/* Inner Content Box Container (Clutter-free and clickable without closing) */}
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative bg-[#050505] border border-white/[0.08] max-w-6xl w-full max-h-[85vh] lg:max-h-none overflow-y-auto lg:overflow-visible shadow-[0_0_100px_rgba(0,0,0,0.9)] z-10 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Frame Status Info Bar */}
              <div className="absolute top-0 inset-x-0 h-10 border-b border-white/[0.05] hidden lg:flex items-center justify-between px-10 text-[9px] font-bold text-white/20 tracking-widest pointer-events-none">
                <span>PROJECT_ARCHIVE_LOG // 0{selectedProject.id}</span>
                <span>STATUS: SECURE_VIEW</span>
              </div>

              {/* Close Button Anchor */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 lg:top-[-45px] lg:right-0 z-[100] text-white/50 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100">{t.closeArchive}</span>
                <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50">
                  <X size={14} strokeWidth={2.5} />
                </div>
              </button>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-12 min-h-[500px] lg:mt-10">
                
                {/* Left Column: Visual Display Component */}
                <div className="lg:col-span-6 relative bg-black/60 p-4 sm:p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                  {/* Decorative corner sights */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#D4AF37]/30" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#D4AF37]/30" />
                  
                  <div className="relative overflow-hidden w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/5] max-h-[40vh] lg:max-h-[60vh] border border-white/5 shadow-2xl">
                    <img 
                      src={selectedProject.imageSrc} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Right Column: Information Panel */}
                <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-10">
                  <div className="space-y-6">
                     <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-2">
                       <Sparkles size={12} className="animate-pulse" />
                       {t.artifactDetails}
                     </p>
                     
                     <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight italic">
                       {selectedProject.title}
                     </h3>
                     
                     <div className="w-12 h-[2px] bg-[#D4AF37]" />
                     
                     <p className="text-white/60 font-medium leading-relaxed text-xs sm:text-sm lg:text-base uppercase tracking-wide max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                       {selectedProject.description}
                     </p>
                  </div>

                  {/* Diagnostic Metrics Matrix */}
                  <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/[0.08]">
                     <div className="space-y-2">
                        <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.25em]">{t.partnerLabel}</p>
                        <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-white/95">{selectedProject.client}</p>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[8px] font-bold text-[#D4AF37]/60 uppercase tracking-[0.25em]">{t.metricLabel}</p>
                        <p className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-wider">{selectedProject.results}</p>
                     </div>
                  </div>

                  {/* Project Launch Button */}
                  <Button 
                    asChild 
                    className="relative group overflow-hidden bg-transparent border border-white/10 hover:border-[#D4AF37] text-white font-black uppercase tracking-[0.3em] h-16 sm:h-20 w-full"
                  >
                    <a href="/contact" className="flex items-center justify-center gap-3">
                      <span className="relative z-10 text-[10px] sm:text-xs">{t.startProject}</span>
                      <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </a>
                  </Button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}