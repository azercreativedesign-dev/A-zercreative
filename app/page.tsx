"use client"
import React, { useState, useEffect, useMemo, useRef } from "react"
import { useLanguageStore } from "@/components/store/useLanguageStore"
import { 
  Layers, 
  Activity, 
  Command,
  Target,
  Box,
  ArrowRight,
  Zap
} from "lucide-react"
import { 
  motion, 
  useTransform, 
  useMotionValue,
  useInView,
  Variants,
  TargetAndTransition,
  useScroll,
  useAnimate
} from "framer-motion"

// --- TYPES ---
type MotionID = "layering" | "motion" | "signal" | "depth";

interface BentoItem {
  id: MotionID;
  title: string;
  tagline: string;
  longDesc: string;
  specs: string[];
  icon: React.ReactNode;
  span?: string;
}

// --- SUB-COMPONENT: LUXURY BENTO CARD ---
function BentoCard({ item }: { item: BentoItem }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { amount: 0.3 })

  const iconVariants: Variants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: (id: MotionID): TargetAndTransition => {
      if (!isInView) return { scale: 1, opacity: 0.8 };
      switch (id) {
        case "layering": return { y: [0, -10, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
        case "motion": return { y: [0, -15, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } };
        case "signal": return { scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1, ease: "easeInOut" } };
        case "depth": return { rotateY: [0, 20, -20, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
        default: return { scale: 1 };
      }
    }
  }

  const titleFluidSize = useMemo(() => {
    const len = item.title.length;
    if (len > 8) {
      return "text-[min(8vw,2.5rem)] sm:text-[min(6vw,2.75rem)] md:text-[min(4vw,3rem)] lg:text-[min(2.2vw,3.2rem)]";
    }
    return "text-[min(10vw,3.2rem)] sm:text-[min(7vw,3.5rem)] md:text-[min(4.5vw,3.8rem)] lg:text-[min(2.5vw,4rem)]";
  }, [item.title]);

  return (
    <div 
      ref={cardRef}
      className={`relative group h-[500px] md:h-[650px] w-full [perspective:2000px] z-10 ${item.span || ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        className="relative h-full w-full [transform-style:preserve-3d] cursor-pointer"
      >
        {/* Front of Card */}
        <div className="absolute inset-0 h-full w-full bg-[#050505] p-6 sm:p-10 flex flex-col items-center justify-center border border-white/[0.03] overflow-hidden [backface-visibility:hidden]">
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40" />

          <motion.div variants={iconVariants} animate="animate" custom={item.id} className="mb-14 text-[#D4AF37]">
            {item.icon}
          </motion.div>

          <div className="text-center relative z-10 w-full px-2">
            <h4 className={`font-black uppercase text-white mb-4 tracking-tight italic leading-none break-keep ${titleFluidSize}`}>
              {item.title}
            </h4>
            <div className="h-[2px] w-12 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-[#D4AF37] text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.35em] uppercase">
              {item.tagline}
            </p>
          </div>
        </div>

        {/* Back of Card */}
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
                {(item.specs ?? []).map((spec, i) => (
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
    </div>
  )
}

// --- MAIN CONTENT ---
function PortfolioContent({ t, lang }: { t: any, lang: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollYProgress } = useScroll()
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85])

  // Persistent Scroll Glow settings
  const glowOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0.3, 1])
  const glowScale = useTransform(scrollYProgress, [0.5, 0.85], [0.8, 1.25])
  const buttonScrollScale = useTransform(scrollYProgress, [0.5, 0.85], [0.9, 1.05])

  // --- INTERACTIVE DRAG-TO-TOGGLE SYSTEM ---
  const dragY = useMotionValue(0)
  const [isFrameActive, setIsFrameActive] = useState(false)
  const [scope, animate] = useAnimate()

  // Track absolute length of dynamic switch wire
  const currentWireHeight = useTransform(dragY, (latest) => 44 + latest)

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
  }

  const handleDragEnd = (event: any, info: any) => {
    // Grab pull distance dynamically
    if (info.offset.y > 35) {
      setIsFrameActive((prev) => !prev)
    }
    // Snap handle back up cleanly
    animate(dragY, 0, { type: "spring", stiffness: 350, damping: 25 })
  }

  // Active toggle framing parameters
  const frameOpacity = isFrameActive ? 1 : 0
  const frameScale = isFrameActive ? 1 : 0.85
  const frameOffset = isFrameActive ? 0 : -20

  const bentoItems: BentoItem[] = useMemo(() => [
    { 
      id: "layering", 
      title: t.layering || "Layering", 
      tagline: t.layeringDesc || "Visual Stacking.", 
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
      title: t.motion || "Motion", 
      tagline: t.motionDesc || "Kinetic Energy.", 
      longDesc: lang === 'ET'
        ? "እንቅስቃሴ ግንኙነት ነው። ማያ ገጾች ተፈጥሯዊ እና ህያው እንዲሆኑ ለማድረግ ለተጠቃሚው ፍላጎት ምላሽ የሚሰጡ ፈሳሽ ሽግግሮችን ለመፍጠር በፊዚክስ ላይ የተመሰረቱ የአኒሜሽን ስፕሪንጎችን (60fps) እንጠቀማለን።"
        : "Motion is communication. We utilize physics-based animation springs (60fps) to create fluid transitions that respond to user intent, making screens feel organic and alive.",
      specs: lang === 'ET'
        ? ["60FPS የፍሬም ማቆያ", "የፊዚክስ ሞተር", "የማቋረጥ ምልክቶች"]
        : ["60FPS FRAME BUFFER", "SPRING PHYSICS ENGINE", "INTERRUPTIBLE GESTURES"], 
      icon: <Activity size={100} strokeWidth={0.5} />, 
      span: "md:-mt-16" 
    },
    { 
      id: "signal", 
      title: t.signal || "Signal", 
      tagline: t.signalDesc || "Precision Output.", 
      longDesc: lang === 'ET'
        ? "እያንዳንዱ ፒክስል ዓላማ አለው። የእኛ የሲግናል ማቀነባበሪያ ሎጂክ ግልጽ የሆነ የእይታ ውጤት እና አነስተኛ የመዘግየት ግብረመልስን ያረጋግጣል።"
        : "Every pixel serves a purpose. Our signal processing logic ensures crystal-clear visual output and low-latency feedback, bridging code and high-fidelity sensory experiences.",
      specs: lang === 'ET'
        ? ["ፍጹም ፒክስል አቀራረብ", "አነስተኛ መዘግየት ግብረመልስ", "የቢት-ሬት ማመቻጸት"]
        : ["PIXEL-PERFECT RENDERING", "LOW-LATENCY FEEDBACK", "BIT-RATE OPTIMIZATION"], 
      icon: <Zap size={100} strokeWidth={0.5} />, 
      span: "md:mt-16" 
    },
    { 
      id: "depth", 
      title: t.depth || "Depth", 
      tagline: t.depthDesc || "Spatial Identity.", 
      longDesc: lang === 'ET'
        ? "በአይሶሜትሪክ ትንበያ እና በብርሃን አማካኝነት ባለሁለት-አቅጣጫዊ ገጽታን ማለፍ። ከተመልካቹ ጋር የሚጣጣሙ የአመለካከት ለውጦችን ለመፍጠር የማንነት ስርዓቶችን በ3D አካባቢ ውስጥ ማስቀመጥ።"
        : "Breaking the 2D plane through isometric projection and lighting. Placing identity systems within a controllable 3D environment for perspective shifts that adapt to the viewer.",
      specs: lang === 'ET'
        ? ["አይሶሜትሪክ ካርታ", "የብርሃን አቀራረብ", "የእይታ ማመቻጸት"]
        : ["ISOMETRIC MAPPING", "VOLUMETRIC LIGHTING", "POV ADAPTATION"], 
      icon: <Target size={100} strokeWidth={0.5} />, 
      span: "md:-mt-32" 
    }
  ], [t, lang]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    }
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleTouch)
    }
  }, [mouseX, mouseY])

  return (
    <main ref={scope} className="bg-[#050505] relative overflow-x-hidden min-h-screen text-white">
      <motion.div className="fixed inset-0 pointer-events-none z-0 opacity-60" 
        style={{ background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.07), transparent 80%)`) }} 
      />

      {/* FIXED PULL-SWITCH SYSTEM 
         Perfect Desktop & Mobile Realignment:
         Uses md:left-[48px] on desktop to align exactly centered with the logo node.
      */}
      <div 
        onTouchStart={handleTouchStart}
        className="fixed top-[74px] left-[24px] md:left-[48px] z-[9999] flex flex-col items-center pointer-events-auto touch-action-none select-none"
      >
        <svg width="32" height="220" className="overflow-visible pointer-events-none">
          {/* Linked Switch Wire */}
          <motion.line
            x1="16"
            y1="0"
            x2="16"
            y2={currentWireHeight}
            stroke="#D4AF37"
            strokeWidth="2.5"
            opacity="0.85"
          />
          {/* Drag handle block */}
          <motion.g
            drag="y"
            dragConstraints={{ top: 0, bottom: 90 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ y: dragY }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.1 }}
          >
            {/* LARGE INVISIBLE HITBOX FOR MOBILE TOUCH INTAKE */}
            <circle cx="16" cy="44" r="28" fill="transparent" className="cursor-pointer" />
            
            {/* Visual Outer Handle Ring */}
            <circle cx="16" cy="44" r="14" fill="#050505" stroke="#D4AF37" strokeWidth="2.5" />
            
            {/* Center Core Node with Active Pulsing Aura */}
            <motion.circle 
              cx="16" 
              cy="44" 
              r="5" 
              fill="#D4AF37" 
              animate={isFrameActive ? {
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1]
              } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      </div>

      {/* HERO SECTION */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }} 
        className="relative min-h-[75vh] md:min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-4 md:pt-32"
      >
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center w-full max-w-[95vw] md:max-w-none"
        >
          {/* Slender Top Line Spacer */}
          <div className="w-[1.5px] h-8 md:h-28 bg-gradient-to-t from-[#D4AF37] to-transparent mx-auto mb-4 md:mb-10" />

          {/* FRAME CONTAINER */}
          <div className="relative p-3 sm:p-10 md:p-24 inline-block w-full">
            {/* Dynamic Corner Brackets - Stays when isFrameActive is True */}
            <motion.div 
              animate={{ opacity: frameOpacity, scale: frameScale, x: frameOffset, y: frameOffset }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="absolute top-0 left-0 w-6 md:w-16 h-6 md:h-16 border-t-4 border-l-4 border-[#D4AF37]" 
            />
            <motion.div 
              animate={{ opacity: frameOpacity, scale: frameScale, x: -frameOffset, y: frameOffset }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="absolute top-0 right-0 w-6 md:w-16 h-6 md:h-16 border-t-4 border-r-4 border-[#D4AF37]" 
            />
            <motion.div 
              animate={{ opacity: frameOpacity, scale: frameScale, x: frameOffset, y: -frameOffset }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="absolute bottom-0 left-0 w-6 md:w-16 h-6 md:h-16 border-b-4 border-l-4 border-[#D4AF37]" 
            />
            <motion.div 
              animate={{ opacity: frameOpacity, scale: frameScale, x: -frameOffset, y: -frameOffset }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="absolute bottom-0 right-0 w-6 md:w-16 h-6 md:h-16 border-b-4 border-r-4 border-[#D4AF37]" 
            />

            {/* CONCEPT TEXT WITH MOTION REACTOR
               Continues moving smoothly unless frame is locked active.
               Once locked, it freezes centered, scales slightly, and glows.
            */}
            <motion.h2 
              animate={isFrameActive ? {
                x: 0,
                y: 0,
                scale: 1.02,
                letterSpacing: "0.03em",
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))"
              } : {
                x: [-1.5, 1.5, -1.5],
                y: [-2, 2, -2],
                scale: 1,
                letterSpacing: "-0.05em",
                filter: "drop-shadow(0 0 0px rgba(255, 255, 255, 0))"
              }} 
              transition={isFrameActive ? {
                type: "spring", 
                stiffness: 120, 
                damping: 14 
              } : {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
              className="text-white text-[15.5vw] sm:text-[14vw] md:text-[14vw] font-black uppercase leading-[0.8] tracking-tighter italic mb-4 md:mb-5"
            >
              {t.concept || "CONCEPT"}
            </motion.h2>

            <div className="flex items-center justify-center gap-3 md:gap-12">
              {/* TO TEXT MOTION */}
              <motion.span 
                animate={isFrameActive ? {
                  x: 0,
                  y: 0,
                  scale: 1.05,
                  filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 0.45))"
                } : {
                  x: [-1, 1, -1],
                  y: [1.5, -1.5, 1.5],
                  scale: 1,
                  filter: "none"
                }}
                transition={isFrameActive ? {
                  type: "spring", 
                  stiffness: 100, 
                  damping: 12 
                } : {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut"
                }}
                className="text-[#D4AF37] text-[11.5vw] sm:text-[9.5vw] md:text-[9vw] font-black uppercase italic leading-none"
              >
                {t.to || "TO"}
              </motion.span>

              <div className="w-[2px] md:w-[3px] h-6 md:h-32 bg-[#D4AF37]" />

              {/* SCREEN TEXT MOTION */}
              <motion.span 
                animate={isFrameActive ? {
                  x: 0,
                  y: 0,
                  scale: 1.02,
                  letterSpacing: "0.03em",
                  filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))"
                } : {
                  x: [1.5, -1.5, 1.5],
                  y: [-2, 2, -2],
                  scale: 1,
                  letterSpacing: "-0.05em",
                  filter: "none"
                }}
                transition={isFrameActive ? {
                  type: "spring", 
                  stiffness: 120, 
                  damping: 14 
                } : {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="text-white text-[11.5vw] sm:text-[9.5vw] md:text-[9vw] font-black uppercase tracking-tighter leading-none"
              >
                {t.screen || "SCREEN"}
              </motion.span>
            </div>
          </div>

          {/* Action Trigger Node */}
          <div className="mt-8 md:mt-20 flex justify-center pb-2">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ repeat: Infinity, duration: 8, ease: "linear" }} 
               className="w-12 h-12 md:w-26 md:h-26 rounded-full border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center cursor-pointer"
             >
                <Command className="w-4 h-4 md:w-7 md:h-7 text-[#D4AF37] animate-pulse" />
             </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* BENTO GRID CAPACITY SECTION */}
      <section className="px-6 md:px-24 pb-96 relative z-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {bentoItems.map((item) => <BentoCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="py-64 md:py-96 flex flex-col items-center justify-center relative z-30 bg-[#050505] overflow-hidden px-4">
        {/* LARGE BACKGROUND A-ZER TEXT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.span 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="text-[50vw] md:text-[45vw] font-black text-white/[0.03] tracking-tighter uppercase italic"
          >
            A-ZER
          </motion.span>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 md:h-64 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50" />
        
        <div className="relative z-10 text-center mb-24 md:mb-32 w-full">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
             <h3 className="text-white text-[16vw] md:text-[12vw] font-black uppercase italic leading-[0.8] mb-[-2vw]">
               {lang === 'ET' ? "ንድፍ" : "DESIGN"}
             </h3>
             <h3 className="text-transparent text-[16vw] md:text-[12vw] font-black uppercase italic leading-[0.8] outline-text tracking-normal md:tracking-widest"
                 style={{ WebkitTextStroke: "2px #D4AF37" }}>
               {lang === 'ET' ? "ለውጥ" : "EVOLUTION"}
             </h3>
          </motion.div>
        </div>

        {/* PERSISTENT SCROLL-GLOW BUTTON */}
        <div className="relative group cursor-pointer">
          {/* Outer Dashed Rotating Ring */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }} 
            className="absolute -inset-10 md:-inset-16 border-4 border-[#D4AF37] rounded-full border-dashed opacity-85 z-10" 
          />

          {/* Absolute Background Glow Aura (Interpolates dynamically on Scroll) */}
          <motion.div 
            style={{
              opacity: glowOpacity,
              scale: glowScale,
            }}
            className="absolute inset-0 bg-[#D4AF37] rounded-full filter blur-[50px] md:blur-[80px] pointer-events-none mix-blend-screen opacity-50 z-0"
          />

          {/* Main Interactive Button */}
          <motion.button 
            style={{
              scale: buttonScrollScale,
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-[#D4AF37] text-black w-44 h-44 md:w-72 md:h-72 rounded-full font-black uppercase text-[15px] md:text-[22px] tracking-[0.2em] md:tracking-[0.4em] flex flex-col items-center justify-center transition-all duration-300 z-10 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <span className="mb-2">{t?.getStarted ?? "LAUNCH"}</span>
            <ArrowRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={4} />
          </motion.button>
        </div>
      </section>

      <style jsx global>{`
        body { background-color: #050505; color: white; margin: 0; cursor: crosshair; overflow-x: hidden; }
        ::selection { background: #D4AF37; color: #000; }
        .outline-text { -webkit-text-fill-color: transparent; }
        .touch-action-none { touch-action: none; }
      `}</style>
    </main>
  )
}

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