"use client"
import React, { useState, useEffect, useMemo, useRef } from "react"
import { useLanguageStore } from "@/components/store/useLanguageStore"
import { 
  Layout, 
  Share2, 
  Box, 
  ArrowUpRight, 
  Fingerprint, 
  Scan, 
  Shield, 
  Cpu, 
  Terminal, 
  ChevronDown, 
  CheckCircle2,
  Layers, 
  Activity, 
  Command,
  Target,
  Zap,
  X,
  Code,
  ArrowRight,
  CornerDownLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  motion, 
  AnimatePresence,
  useTransform, 
  useMotionValue,
  useInView,
  Variants,
  TargetAndTransition,
  useScroll
} from "framer-motion"

// ==========================================
// --- INTERFACES & TYPE DEFINITIONS ---
// ==========================================
type MotionID = "layering" | "motion" | "signal" | "depth"

interface BentoItem {
  id: MotionID
  title: string
  tagline: string
  longDesc: string
  specs: string[]
  icon: React.ReactNode
  span?: string
}

interface WorkflowStep {
  phase: string
  title: string
  desc: string
  metric: string
  bullets: string[]
}

interface ServiceDetail {
  title: string
  sysCode: string
  extendedDesc: string
  metrics: { label: string; value: string }[]
  technologies: string[]
  deliverables: string[]
}

const DEFAULT_WORKFLOW_STEP: WorkflowStep = {
  phase: "PHASE 01",
  title: "Diagnostic Blueprint",
  desc: "Our architectural onboarding standard. We audit your brand's existing identity markers and build a cryptographic strategy roadmap.",
  metric: "EFFICIENCY // +140%",
  bullets: ["Deep-identity audit", "Competitor matrix breakdown", "Technical systems setup"]
}

// ==========================================
// --- SUB-COMPONENT: LUXURY BENTO CARD ---
// ==========================================
function BentoCard({ item }: { item: BentoItem }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.9, 1, 1, 0.9])
  const yOffset = useTransform(scrollYProgress, [0.1, 0.3], [60, 0])

  const inViewRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(inViewRef, { amount: 0.3 })

  const iconVariants: Variants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: (id: MotionID): TargetAndTransition => {
      if (!isInView) return { scale: 1, opacity: 0.8 }
      switch (id) {
        case "layering": 
          return { y: [0, -10, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }
        case "motion": 
          return { y: [0, -15, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }
        case "signal": 
          return { scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } }
        case "depth": 
          return { rotateY: [0, 20, -20, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
        default: 
          return { scale: 1 }
      }
    }
  }

  const titleFluidSize = useMemo(() => {
    const len = item.title.length
    if (len > 8) {
      return "text-[min(8vw,2.5rem)] sm:text-[min(6vw,2.75rem)] md:text-[min(4vw,3rem)] lg:text-[min(2.2vw,3.2rem)]"
    }
    return "text-[min(10vw,3.2rem)] sm:text-[min(7vw,3.5rem)] md:text-[min(4.5vw,3.8rem)] lg:text-[min(2.5vw,4rem)]"
  }, [item.title])

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, scale, y: yOffset }}
      className={cn(
        "relative group h-[480px] md:h-[600px] w-full [perspective:2000px] z-10",
        item.span
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        className="relative h-full w-full [transform-style:preserve-3d] cursor-pointer"
      >
        {/* FRONT: Visual Representation */}
        <div className="absolute inset-0 h-full w-full bg-[#050505] p-6 sm:p-10 flex flex-col items-center justify-center border border-white/[0.03] overflow-hidden [backface-visibility:hidden]">
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40" />

          <div ref={inViewRef} className="absolute inset-0 pointer-events-none" />

          <motion.div variants={iconVariants} animate="animate" custom={item.id} className="mb-14 text-[#D4AF37]">
            {item.icon}
          </motion.div>

          <div className="text-center relative z-10 w-full px-2">
            <h4 className={cn("font-black uppercase text-white mb-4 tracking-tight italic leading-none break-keep truncate whitespace-nowrap", titleFluidSize)}>
              {item.title}
            </h4>
            <div className="h-[2px] w-12 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-[#D4AF37] text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.35em] uppercase">
              {item.tagline}
            </p>
          </div>
        </div>

        {/* BACK: Details & Specs */}
        <div className="absolute inset-0 h-full w-full bg-[#080808] p-10 md:p-14 flex flex-col justify-between border-2 border-[#D4AF37] [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_50px_rgba(212,175,55,0.1)]">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
               <Zap size={18} className="text-[#D4AF37] animate-pulse" />
               <span className="text-white/20 text-[10px] font-black tracking-widest uppercase italic">A-ZER // SYSTEM_LOG</span>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-black uppercase text-white mb-6 italic border-b border-white/10 pb-4">
                {item.title}
              </h4>
              <p className="text-white/60 text-xs md:text-sm lg:text-base leading-relaxed uppercase font-medium tracking-wide">
                {item.longDesc}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3">
                {item.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#D4AF37] text-[10px] font-bold tracking-tighter italic">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" /> {spec}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex justify-between items-center">
             <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em]">TECH_ENHANCED_V2</span>
             <Box size={20} className="text-white/20" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ==========================================
// --- SUB-COMPONENT: SERVICES GRID ---
// ==========================================
export function ServicesSection() {
  const t = useLanguageStore((state) => state.t)
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)

  // Prevent background scrolling on mobile when terminal drawer is active
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedService])

  const services = useMemo(() => [
    { 
      title: t.design || "DESIGN", 
      icon: <Layout className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />, 
      tags: ["UI/UX", "3D Web", "WebGL"],
      span: "lg:col-span-2 md:col-span-3 col-span-1",
      desc: t.designDesc || "Crafting premium, high-end visual frameworks tailored for elite brands.",
      sysCode: "SYS_GRAPH_01",
      extendedDesc: "A complete visual reconstruction. We engineer custom-rendered 3D interfaces and WebGL layers that elevate your identity. This is not template-level layout creation; this is bespoke visual production.",
      metrics: [
        { label: "USER ENGAGEMENT", value: "+180%" },
        { label: "RENDER ENGINE PERFORMANCE", value: "120FPS" }
      ],
      technologies: ["React Three Fiber", "GLSL Shaders", "Tailwind CSS", "Framer Motion"],
      deliverables: ["Custom 3D Art Asset Suite", "Interactive Style Guides", "Responsive Visual Frameworks"]
    },
    { 
      title: t.strategy || "STRATEGY", 
      icon: <Share2 className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />, 
      tags: ["GROWTH", "VIRTUAL ID"],
      span: "lg:col-span-1 md:col-span-3 col-span-1",
      desc: t.strategyDesc || "Forging systematic roads to digital scale and visual dominance.",
      sysCode: "SYS_STRAT_02",
      extendedDesc: "Market dominance is structured, not accidental. We construct architectural positioning systems, competitor mapping structures, and secure growth pathways to solidify brand authority.",
      metrics: [
        { label: "BRAND VISIBILITY", value: "3.2X" },
        { label: "RETENTION SCALING", value: "+45%" }
      ],
      technologies: ["Data Analysis Engine", "Identity Flow Mapping", "SEO Structuring"],
      deliverables: ["Full Competitive Diagnostic Reports", "Digital Asset Roadmap", "Growth Execution Plan"]
    },
    { 
      title: t.production || "PRODUCTION", 
      icon: <Box className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />, 
      tags: ["NEXT.JS", "GLSL", "SHADERS"],
      span: "lg:col-span-1 md:col-span-3 col-span-1",
      desc: t.productionDesc || "Deploying flawless, high-fidelity technical architecture and layouts.",
      sysCode: "SYS_PROD_03",
      extendedDesc: "We build layouts with absolute precision. Implementing clean Next.js setups, fast loading times, and zero performance drift across devices. Your structure remains flawless under massive simulated traffic loads.",
      metrics: [
        { label: "PAGE SPEED PERFORMANCE SCORE", value: "100/100" },
        { label: "LCP (LARGEST CONTENTFUL PAINT)", value: "<0.8s" }
      ],
      technologies: ["Next.js App Router", "Vercel Edge Servers", "GraphQL Integration"],
      deliverables: ["Production-Ready Source Build", "CDN Orchestration Blueprint", "Fully Automated CI/CD Pipeline"]
    },
    { 
      title: t.intelligence || "INTELLIGENCE", 
      icon: <Scan className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />, 
      tags: ["NEURAL MODELING", "DATA VIS"],
      span: "lg:col-span-2 md:col-span-3 col-span-1",
      desc: t.intelligenceDesc || "Applying machine learning, algorithmic systems, and analytics.",
      sysCode: "SYS_NEUR_04",
      extendedDesc: "Infusing computational intelligence directly into your visual systems. From personalized algorithms to dynamic real-time data visualization layouts, we make your product think, learn, and adapt.",
      metrics: [
        { label: "DATA RETRIEVAL SPEED", value: "<80ms" },
        { label: "ALGORITHMIC EFFICIENCY", value: "+94%" }
      ],
      technologies: ["Vector Embeddings", "Custom ML Models", "D3.js Data Nodes"],
      deliverables: ["AI Integration Architecture", "Custom Predictive Engines", "Real-Time Analytical Dashboards"]
    }
  ], [t])

  const workflowSteps: WorkflowStep[] = useMemo(() => [
    {
      phase: "PHASE 01",
      title: "Diagnostic Blueprint",
      desc: "Our architectural onboarding standard. We audit your brand's existing identity markers and build a cryptographic strategy roadmap.",
      metric: "EFFICIENCY // +140%",
      bullets: ["Deep-identity audit", "Competitor matrix breakdown", "Technical systems setup"]
    },
    {
      phase: "PHASE 02",
      title: "High-Fidelity Assembly",
      desc: "Translating digital blueprint models into production-ready visual systems utilizing WebGL, customized shaders, and next-generation codebases.",
      metric: "VISUAL ACCURACY // 99.8%",
      bullets: ["3D environment rendering", "Bespoke interface styling", "Interactive prototype builds"]
    },
    {
      phase: "PHASE 03",
      title: "Encrypted Deployment",
      desc: "Rigorous performance diagnostics, load-testing under intense simulated traffic, and live server deployment of your system framework.",
      metric: "LATENCY // <120ms",
      bullets: ["Global CDN allocation", "Performance profiling", "Vulnerability validation tests"]
    }
  ], [])

  const currentStep = useMemo<WorkflowStep>(() => {
    return workflowSteps[activeWorkflowStep] ?? DEFAULT_WORKFLOW_STEP
  }, [activeWorkflowStep, workflowSteps])

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden text-white w-full">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Fingerprint className="text-[#D4AF37] animate-pulse" size={16} />
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block">
                {t.servicesTitle || "CAPABILITIES"}
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] italic">
              {t.servicesSubtitle || "Expertise Blueprint"}
            </h2>
          </div>
          
          <div className="pb-4 w-full md:w-auto">
            <div className="flex items-center gap-3 text-white/40 text-[9px] font-black uppercase tracking-widest border border-white/[0.08] bg-white/[0.01] px-5 py-3 rounded backdrop-blur-md">
              <Shield size={12} className="text-[#D4AF37]" /> 
              <span>Encrypted Studio Standards</span>
            </div>
          </div>
        </div>

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 md:mb-32">
          {services.map((s, i) => (
            <motion.div 
              key={`cap-grid-${i}`}
              whileHover={typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches ? { y: -5 } : undefined}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setSelectedService(s)}
              className={cn(
                "group relative p-6 sm:p-10 bg-[#090909] border border-white/[0.04] transition-all duration-700 overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[380px] md:min-h-[420px] rounded cursor-pointer",
                "hover:border-[#D4AF37]/50 [@media(hover:none)]:hover:border-white/[0.04]",
                s.span
              )}
            >
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent top-0 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] [@media(hover:none)]:group-hover:animate-none pointer-events-none" />

              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/[0.06] group-hover:border-[#D4AF37] [@media(hover:none)]:group-hover:border-white/[0.06] transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/[0.06] group-hover:border-[#D4AF37] [@media(hover:none)]:group-hover:border-white/[0.06] transition-all duration-500" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.02),transparent_50%)] opacity-0 group-hover:opacity-100 [@media(hover:none)]:group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />

              <span className="absolute top-4 right-8 text-[80px] sm:text-[100px] md:text-[140px] font-black text-white/[0.015] leading-none select-none group-hover:text-[#D4AF37]/[0.03] group-hover:scale-105 [@media(hover:none)]:group-hover:text-white/[0.015] [@media(hover:none)]:group-hover:scale-100 transition-all duration-700">
                0{i + 1}
              </span>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 sm:mb-10">
                  <div className="text-[#D4AF37] group-hover:scale-110 group-hover:rotate-3 [@media(hover:none)]:group-hover:scale-100 [@media(hover:none)]:group-hover:rotate-0 transition-transform duration-500 origin-left drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    {s.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-white/20 tracking-wider">
                    {s.sysCode}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase mb-3 sm:mb-4 tracking-tight italic group-hover:text-[#D4AF37] [@media(hover:none)]:group-hover:text-white transition-colors duration-300">
                  {s.title}
                </h3>
                
                <p className="text-white/50 text-xs sm:text-sm font-medium leading-relaxed max-w-lg mb-6 sm:mb-8 uppercase tracking-wide">
                  {s.desc}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 sm:pt-6 border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {s.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[7.5px] sm:text-[8px] text-white/40 border border-white/[0.08] bg-white/[0.01] px-2 sm:px-2.5 py-1 uppercase tracking-widest font-black rounded group-hover:border-[#D4AF37]/30 group-hover:text-white/80 [@media(hover:none)]:group-hover:border-white/[0.08] [@media(hover:none)]:group-hover:text-white/40 transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent [@media(hover:none)]:group-hover:bg-white/5 [@media(hover:none)]:group-hover:text-white [@media(hover:none)]:group-hover:border-white/10 transition-all duration-500 shrink-0 shadow-lg">
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 [@media(hover:none)]:group-hover:translate-x-0 [@media(hover:none)]:group-hover:translate-y-0 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SYSTEM DETAILS DRAWER MODAL */}
        <AnimatePresence>
          {selectedService && (
            <>
              {/* Dimmed Overlay with forced backdrop click target */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-[#020202] z-[99] cursor-pointer"
              />
              
              {/* Immersive Terminal Drawer - adjusted width on mobile to show overlay gap */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="fixed right-0 top-0 h-full w-[88vw] sm:w-[500px] md:w-[600px] bg-[#070707] border-l border-[#D4AF37]/30 z-[100] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
              >
                {/* Touch Device Dismiss Drag Handle */}
                <div 
                  onClick={() => setSelectedService(null)}
                  className="sm:hidden w-full py-4 bg-[#0a0a0a] flex items-center justify-center border-b border-white/[0.03] active:bg-white/[0.02]"
                >
                  <div className="w-12 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Drawer Header with Larger Touch Target Close Button */}
                <div className="p-6 md:p-8 border-b border-white/[0.06] flex justify-between items-center bg-[#090909]">
                  <div className="flex items-center gap-3">
                    <Code size={16} className="text-[#D4AF37] animate-pulse" />
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">{selectedService.sysCode}</span>
                      <h4 className="text-xl md:text-2xl font-black uppercase text-white italic tracking-tight">{selectedService.title}</h4>
                    </div>
                  </div>

                  {/* High-accessibility Close Button for Mobile Screens */}
                  <button 
                    onClick={() => setSelectedService(null)}
                    aria-label="Close panel"
                    className="p-3 sm:p-2 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded transition-colors duration-300 group touch-manipulation"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
                  {/* Service Description */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.2em]">01 / FUNCTION_OVERVIEW</p>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed uppercase font-medium tracking-wide">
                      {selectedService.extendedDesc}
                    </p>
                  </div>

                  {/* High-Fidelity Performance Metrics */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.2em]">02 / SYS_METRICS</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedService.metrics.map((metric, idx) => (
                        <div key={idx} className="p-4 bg-[#0a0a0a] border border-white/[0.04] rounded">
                          <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block mb-1">{metric.label}</span>
                          <span className="text-lg md:text-xl font-mono font-black text-[#D4AF37]">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Technologies */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.2em]">03 / STACK_ALLOCATION</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[9px] md:text-[10px] text-white/60 bg-white/[0.02] border border-white/[0.08] px-3 py-1.5 uppercase font-bold tracking-widest rounded-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* System Deliverables */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.2em]">04 / DELIVERABLES_INTEGRITY</p>
                    <ul className="space-y-3">
                      {selectedService.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-white/80 font-bold uppercase tracking-wide">
                          <CheckCircle2 size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Drawer Footer Call to Action */}
                <div className="p-6 md:p-8 border-t border-white/[0.06] bg-[#090909] flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-white/30">System Status:</span>
                    <span className="text-[#D4AF37] animate-pulse">● READY FOR DEPLOYMENT</span>
                  </div>
                  <button className="w-full py-4 bg-[#D4AF37] text-[#050505] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 rounded hover:bg-white transition-colors duration-500 group shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    Initialize Diagnostic <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Mobile Back-to-System Button Trigger */}
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="sm:hidden w-full py-3 mt-1 bg-white/[0.02] hover:bg-white/5 border border-white/10 rounded flex items-center justify-center gap-2 text-[10px] font-mono font-bold tracking-widest text-white/60 active:bg-white/10"
                  >
                    <CornerDownLeft size={12} /> BACK TO SYSTEM
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Operational Engine Panels */}
        <div className="border-t border-white/[0.08] pt-20">
          <div className="max-w-xl mb-14">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">
              EXECUTION PROCESS
            </span>
            <div className="flex items-center gap-4">
              <div className="h-10 w-[2px] bg-[#D4AF37]" />
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight italic">
                Operational Blueprint
              </h3>
            </div>
          </div>

          {/* Desktop Engine Panel */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            <div className="col-span-4 space-y-3">
              {workflowSteps.map((step, idx) => (
                <button
                  key={step.phase}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={cn(
                    "w-full text-left p-6 border transition-all duration-500 flex items-center justify-between group cursor-pointer",
                    activeWorkflowStep === idx
                      ? "bg-[#090909] border-[#D4AF37]/50 text-white"
                      : "bg-transparent border-white/[0.03] text-white/40 hover:text-white/80 hover:border-white/10"
                  )}
                >
                  <div className="space-y-1">
                    <p className="text-[9px] font-mono font-bold tracking-widest opacity-60">{step.phase}</p>
                    <p className="text-lg font-black uppercase tracking-tight">{step.title}</p>
                  </div>
                  <div className={cn(
                    "p-2 rounded-full border transition-all duration-500",
                    activeWorkflowStep === idx
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-white/10 text-white/20 group-hover:border-white/20"
                  )}>
                    <ArrowUpRight size={14} className={cn("transition-transform duration-500", activeWorkflowStep === idx && "rotate-45")} />
                  </div>
                </button>
              ))}
            </div>

            {/* Step Panel Details */}
            <div className="col-span-8 bg-[#090909] border border-white/[0.06] p-10 min-h-[330px] flex flex-col justify-between relative rounded">
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]/40" />

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <span className="text-[10px] font-mono font-bold px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] tracking-widest uppercase">
                    ACTIVE_{currentStep.phase}
                  </span>
                  <h4 className="text-3xl font-black uppercase italic">{currentStep.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed uppercase tracking-wide">
                    {currentStep.desc}
                  </p>
                </div>

                <div className="space-y-6 pl-8 border-l border-white/[0.04]">
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">Diagnostic Target</p>
                    <p className="text-sm font-mono font-bold text-[#D4AF37]">{currentStep.metric}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">Deliverables</p>
                    <ul className="space-y-2">
                      {currentStep.bullets.map((bullet) => (
                        <li key={bullet} className="text-xs uppercase font-semibold text-white/70 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-[#D4AF37]/60" /> {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className="lg:hidden space-y-4">
            {workflowSteps.map((step, idx) => {
              const isOpen = activeWorkflowStep === idx
              return (
                <div 
                  key={step.phase}
                  className={cn(
                    "border transition-all duration-500 rounded overflow-hidden",
                    isOpen ? "bg-[#090909] border-[#D4AF37]/30" : "bg-transparent border-white/[0.04]"
                  )}
                >
                  <button
                    onClick={() => setActiveWorkflowStep(isOpen ? -1 : idx)}
                    className="w-full text-left p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("h-8 w-[2px] transition-colors duration-500", isOpen ? "bg-[#D4AF37]" : "bg-white/10")} />
                      <div>
                        <span className="text-[8px] font-mono text-[#D4AF37] tracking-widest block mb-0.5">{step.phase}</span>
                        <h4 className="text-base font-black uppercase tracking-tight">{step.title}</h4>
                      </div>
                    </div>
                    <ChevronDown size={18} className={cn("text-white/50 transition-transform duration-500", isOpen && "rotate-180 text-[#D4AF37]")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 border-t border-white/[0.03] space-y-6">
                          <p className="text-white/50 text-xs leading-relaxed uppercase tracking-wide">
                            {step.desc}
                          </p>
                          
                          <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/[0.03]">
                            <div>
                              <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Diagnostic Target</p>
                              <p className="text-xs font-mono font-bold text-[#D4AF37]">{step.metric}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Deliverables</p>
                              <ul className="space-y-1.5">
                                {step.bullets.map((bullet) => (
                                  <li key={bullet} className="text-[10px] uppercase font-semibold text-white/70 flex items-center gap-2">
                                    <CheckCircle2 size={10} className="text-[#D4AF37]/60" /> {bullet}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Diagnostic Footer Metrics */}
        <div className="mt-28 pt-10 border-t border-white/[0.05] flex flex-wrap justify-between items-center gap-8 opacity-40">
          <div className="flex gap-12 sm:gap-16">
            <div className="space-y-1.5">
              <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/40 flex items-center gap-1.5">
                <Cpu size={10} className="text-[#D4AF37]" /> Refresh_Rate
              </p>
              <p className="text-[10px] font-mono font-bold text-white">120Hz // HIGH_STABILITY</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/40 flex items-center gap-1.5">
                <Terminal size={10} className="text-[#D4AF37]" /> Execution_Model
              </p>
              <p className="text-[10px] font-mono font-bold text-white">Neural_Architecture</p>
            </div>
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
            A-ZER_CAPABILITIES // DEPLOYED
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// --- PORTFOLIO CONTENT ENGINE ---
// ==========================================
function PortfolioContent({ t, lang }: { t: any, lang: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollYProgress } = useScroll()

  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.88])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX)
        mouseY.set(e.touches[0].clientY)
      }
    }
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleTouch)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleTouch)
    }
  }, [mouseX, mouseY])

  const bentoItems: BentoItem[] = useMemo(() => [
    { 
      id: "layering", 
      title: t.layering || "LA...", 
      tagline: t.layeringDesc || "VISUAL STACKING.", 
      longDesc: lang === 'ET' 
        ? "ባለብዙ-አውታር የZ-index አያያዝን በመጠቀም ውስብስብ የእይታ ተዋረዶችን መፍጠር። የእኛ የደረጃ መዋቅር እያንዳንዱ የገጽታ አካል የቦታ ተዛማጅነቱን ጠብቆ እንዲቆይ ያደርጋል።"
        : "Developing complex visual hierarchies through multi-plane Z-index management. Our layering engine ensures every interface element maintains its spatial relationship, guiding the eye naturally.",
      specs: lang === 'ET'
        ? ["የፓራላክስ ጥልቀት ቁጥጥር", "የቦታ ማመቻጸት", "ተለዋዋጭ ጥላ ካርታ"]
        : ["PARALLAX DEPTH CONTROL", "Z-SPACE OPTIMIZATION", "DYNAMIC SHADOW MAPPING"], 
      icon: <Layers size={100} strokeWidth={0.5} />, 
      span: "md:mt-32" 
    },
    { 
      id: "motion", 
      title: t.motion || "MO...", 
      tagline: t.motionDesc || "KINETIC ENERGY.", 
      longDesc: lang === 'ET'
        ? "እንቅስቃሴ ግንኙነት ነው። ማያ ገጾች ተፈጥሯዊ እና ህያው እንዲሆኑ ለማድረግ ለተጠቃሚው ፍላጎት ምላሽ የሚሰጡ ፈሳሽ ሽግግሮችን ለመፍጠር በፊዚክስ ላይ የተመሰረቱ የአኒሜሽን ስፕሪንጎችን (60fps) እንጠቀማለን."
        : "Motion is communication. We utilize physics-based animation springs (60fps) to create fluid transitions that respond to user intent, making screens feel organic and alive.",
      specs: lang === 'ET'
        ? ["60FPS የፍሬም ማቆያ", "የፊዚክስ ሞተር", "የማቋረጥ ምልክቶች"]
        : ["60FPS FRAME BUFFER", "SPRING PHYSICS ENGINE", "INTERRUPTIBLE GESTURES"], 
      icon: <Activity size={100} strokeWidth={0.5} />, 
      span: "md:-mt-16" 
    },
    { 
      id: "signal", 
      title: t.signal || "SIG...", 
      tagline: t.signalDesc || "PRECISION OUTPUT.", 
      longDesc: lang === 'ET'
        ? "እያንዳንዱ ፒክስል ዓላማ አለው። የእኛ የሲግናል ማቀነባበሪያ ሎጂክ ግልጽ የሆነ የእይታ ውጤት እና አነስተኛ የመዘግየት ግብረመልስን ያረጋግጣል።"
        : "Every pixel serves a purpose. Our signal processing logic ensures crystal-clear visual output and low-latency feedback, bridging code and high-fidelity sensory experiences.",
      specs: lang === 'ET'
        ? ["ፍጹም ፒክስል አቀራረብ", "አነስተኛ መዘግየት ግብረመልስ", "የቢት-ሬት ማመቻቸት"]
        : ["PIXEL-PERFECT RENDERING", "LOW-LATENCY FEEDBACK", "BIT-RATE OPTIMIZATION"], 
      icon: <Zap size={100} strokeWidth={0.5} />, 
      span: "md:mt-16" 
    },
    { 
      id: "depth", 
      title: t.depth || "DE...", 
      tagline: t.depthDesc || "SPATIAL IDENTITY.", 
      longDesc: lang === 'ET'
        ? "በአይሶሜትሪክ ትንበያ እና በብርሃን አማካኝነት ባለሁለት-አቅጣጫዊ ገጽታን ማለፍ። ከተመልካቹ ጋር የሚጣጣሙ የአመለካከት ለውጦችን ለመፍጠር የማንነት ስርዓቶችን በ3D አካባቢ ውስጥ ማስቀመጥ።"
        : "Breaking the 2D plane through isometric projection and lighting. Placing identity systems within a controllable 3D environment for perspective shifts that adapt to the viewer.",
      specs: lang === 'ET'
        ? ["አይሶሜትሪክ ካርታ", "የብርሃን አቀራረብ", "የእይታ ማመቻጸት"]
        : ["ISOMETRIC MAPPING", "VOLUMETRIC LIGHTING", "POV ADAPTATION"], 
      icon: <Target size={100} strokeWidth={0.5} />, 
      span: "md:-mt-32" 
    }
  ], [t, lang])

  return (
    <main className="bg-[#050505] relative overflow-x-hidden min-h-screen text-white">
      {/* Dynamic Background Flare */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 opacity-60" 
        style={{ 
          background: useTransform([mouseX, mouseY], ([x, y]) => 
            `radial-gradient(800px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.07), transparent 80%)`
          ) 
        }} 
      />

      {/* Hero Header Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }} 
        className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-4 pt-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center w-full max-w-[95vw] md:max-w-none"
        >
          <div className="w-[2px] h-20 md:h-32 bg-gradient-to-t from-[#D4AF37] to-transparent mx-auto mb-8 md:mb-12" />

          <div className="relative p-8 md:p-24 inline-block w-full">
            <div className="absolute top-0 left-0 w-12 md:w-16 h-12 md:h-16 border-t-4 border-l-4 border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 border-t-4 border-r-4 border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-12 md:w-16 h-12 md:h-16 border-b-4 border-l-4 border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-12 md:w-16 h-12 md:h-16 border-b-4 border-r-4 border-[#D4AF37]" />

            <motion.h2 
              animate={{ x: [-1.5, 1.5, -1.5] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-white text-[15vw] md:text-[14vw] font-black uppercase leading-[0.85] tracking-tighter italic mb-4"
            >
              {t.concept || "CONCEPT"}
            </motion.h2>

            <div className="flex items-center justify-center gap-3 md:gap-12">
              <span className="text-[#D4AF37] text-[10vw] md:text-[9vw] font-black uppercase italic leading-none">
                {t.to || "TO"}
              </span>
              <div className="w-[2px] md:w-[3px] h-10 md:h-32 bg-[#D4AF37]" />
              <span className="text-white text-[10vw] md:text-[9vw] font-black uppercase tracking-tighter leading-none">
                {t.screen || "SCREEN"}
              </span>
            </div>
          </div>

          <div className="mt-16 md:mt-24 flex justify-center pb-10">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ repeat: Infinity, duration: 8, ease: "linear" }} 
               className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center cursor-pointer"
             >
                <Command size={32} className="text-[#D4AF37] animate-pulse" />
             </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Motion Bento Scroll Grid */}
      <section className="px-6 md:px-24 pb-32 relative z-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {bentoItems.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Integrated Services Component */}
      <ServicesSection />

      {/* Bottom Footer Section */}
      <div className="pb-16 pt-10 border-t border-white/5 flex flex-col items-center justify-center gap-6 text-center opacity-20 relative z-10 bg-[#050505]">
        <span className="text-[14vw] md:text-[10vw] font-black text-white/5 tracking-tighter uppercase italic select-none">A-ZER</span>
        <div className="flex gap-12 text-center">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-black">Refresh_Rate</p>
            <p className="text-xs font-bold text-[#D4AF37]">120Hz / Studio</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-black">Execution_Model</p>
            <p className="text-xs font-bold">Neural_Architecture</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body { background-color: #050505; color: white; margin: 0; cursor: crosshair; overflow-x: hidden; }
        ::selection { background: #D4AF37; color: #000; }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        /* Custom Scrollbar for modern terminal look */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </main>
  )
}

// ==========================================
// --- DEFAULT EXPORT: Home ---
// ==========================================
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const translationStore = useLanguageStore((state) => state.t)
  const currentLang = useLanguageStore((state) => state.lang)
  const t = translationStore ?? {}
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
         <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <PortfolioContent t={t} lang={currentLang} />
}