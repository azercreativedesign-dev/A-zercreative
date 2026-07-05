"use client"
import { useLanguageStore } from "@/components/store/useLanguageStore"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroSection() {
  const { t, lang } = useLanguageStore()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Parallax for the text as you scroll
  const textY = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25
      })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 bg-[#050505] overflow-hidden select-none antialiased">
      
      {/* LUXURY BACKGROUND DEPTH */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{ x: mousePos.x, y: mousePos.y }}
        >
          {/* Soft Gold Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
        </motion.div>
      </div>

      <motion.div 
        style={{ y: textY }}
        className="relative z-10 text-center px-6"
      >
        {/* REVEAL: STATUS TAG */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="inline-flex items-center gap-3 px-5 py-1.5 border border-white/10 bg-white/[0.03] rounded-full mb-10 backdrop-blur-xl shadow-2xl"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
          </span>
          <span className="text-[8px] font-black text-white/50 tracking-[0.5em] uppercase">
            {t.initiating}
          </span>
        </motion.div>

        {/* REVEAL: MAIN HEADLINE */}
        <h1 className="flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-white text-[18vw] md:text-[10rem] font-black uppercase tracking-[-0.07em] leading-[0.75] mix-blend-difference"
          >
            {t.concept}
          </motion.span>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="flex items-center justify-center -mt-4 md:-mt-8"
          >
            <span className="text-[#D4AF37] italic font-extralight text-[5vw] md:text-3xl tracking-tighter mx-4 lowercase opacity-50">
              {t.to}
            </span>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`text-transparent italic text-[14vw] md:text-[8rem] font-black uppercase ${lang === 'ET' ? 'tracking-normal' : 'tracking-tighter'}`}
              style={{ 
                WebkitTextStroke: '1px rgba(212, 175, 55, 0.5)',
                filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.1))'
              }}
            >
              {t.screen}
            </motion.span>
          </motion.div>
        </h1>

        {/* INTERACTIVE CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          {/* Gold Vertical Divider */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="w-px bg-gradient-to-b from-[#D4AF37] to-transparent" 
          />

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-4 bg-transparent border border-[#D4AF37]/30 overflow-hidden transition-all duration-700"
          >
            {/* Animated Fill Background */}
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            
            <div className="relative z-10 flex items-center gap-4">
              <span className="text-[10px] font-black text-white group-hover:text-black uppercase tracking-[0.5em] transition-colors duration-500">
                {t.getQuote}
              </span>
              <div className="p-1 rounded-full border border-white/10 group-hover:border-black/20 transition-colors">
                <ArrowUpRight size={14} className="text-[#D4AF37] group-hover:text-black transition-colors duration-500" />
              </div>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* LUXURY DEKOR: CORNER COORDINATES (Subtle Detail) */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <span className="text-[8px] font-mono text-white/10 tracking-[0.3em] uppercase">
          AZR_V.2026 // ADDIS_ABABA
        </span>
      </div>
    </section>
  )
}