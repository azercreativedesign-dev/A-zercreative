"use client"
import Image from "next/image"
import { useLanguageStore } from "@/components/store/useLanguageStore"
import { Cpu, Fingerprint, Terminal, Zap } from "lucide-react"

// NAMED EXPORT: This must match the name used in the import braces { }
export function AboutSection() {
  const { t } = useLanguageStore()

  const arsenal = [
    { name: "Midjourney v6", category: t.intelligence, level: "99%" },
    { name: "Stable Diffusion", category: t.intelligence, level: "94%" },
    { name: "Runway Gen-3", category: t.motion, level: "88%" },
    { name: "Claude 3.5 / GPT-4o", category: t.strategy, level: "96%" },
    { name: "Next.js / React", category: t.production, level: "92%" },
    { name: "Adobe Creative Cloud", category: t.design, level: "98%" },
  ]

  return (
    <section id="about" className="relative pt-0 pb-0 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-2">
              <Fingerprint size={16} className="text-[#D4AF37] animate-pulse" />
              <span className="text-white/40 text-[8px] font-black uppercase tracking-[1em]">
                {t.identityVerified}
              </span>
            </div>
            <h2 className="text-[10vw] md:text-[8rem] font-black text-white uppercase leading-[0.75] tracking-[-0.08em]">
              {t.born} <br />
              <span className="text-transparent italic" style={{ WebkitTextStroke: '1px #D4AF37' }}>
                {t.hybrid}
              </span>
            </h2>
          </div>
          <div className="text-right max-w-sm border-r-2 border-[#D4AF37] pr-6 py-1">
            <p className="text-white/50 text-[9px] uppercase tracking-[0.2em] leading-relaxed font-bold">
              {t.aboutUnit}
            </p>
          </div>
        </div>

        {/* TECH ARSENAL GRID */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Cpu size={12} className="text-[#D4AF37]"/>
            <h3 className="text-white text-[9px] font-black uppercase tracking-[0.8em]">
              {t.neuralEngine}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {arsenal.map((app, i) => (
              <div key={i} className="group relative bg-black p-6 hover:bg-[#D4AF37]/5 transition-all duration-700">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-mono text-[#D4AF37]">/ 0{i+1}</span>
                    <Terminal size={10} className="text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <h4 className="text-white text-lg font-black uppercase tracking-tight mb-1">{app.name}</h4>
                  <p className="text-white/30 text-[7px] uppercase tracking-widest mb-4">{app.category}</p>
                  <div className="w-full h-px bg-white/10 relative">
                    <div 
                      className="absolute h-full bg-[#D4AF37] transition-all duration-1000 ease-out"
                      style={{ width: app.level }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOUNDER SPOTLIGHT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative aspect-4/5 max-h-150 border border-white/5 flex items-center justify-center group overflow-hidden bg-black">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] z-30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] z-30" />
            <Image 
              src="/ab.jpg" 
              alt="Abenezer Mulatu"
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              {t.the} <br /><span className="text-[#D4AF37]">{t.theFounder}</span>
            </h2>
            <div className="space-y-4 max-w-xl">
              <p className="text-lg text-white/90 font-light leading-snug italic">
                "{t.legacyQuote}"
              </p>
              <p className="text-white/40 text-[9px] tracking-[0.2em] leading-relaxed uppercase font-bold">
                <span className="text-white">Abenezer Mulatu</span> {t.founderDesc}
              </p>
              <button className="flex items-center gap-6 group pt-2">
                <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.5em]">
                  {t.requestPortfolio}
                </span>
                <div className="w-6 h-px bg-[#D4AF37] group-hover:w-16 transition-all duration-700" />
                <Zap size={12} className="text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
           {[
             { label: t.precision, value: "99.9%" },
             { label: t.uptime, value: "24/7" },
             { label: t.assets, value: "4.2K" },
             { label: t.ratio, value: t.high },
           ].map((stat, i) => (
             <div key={i} className="bg-black py-8 flex flex-col items-center justify-center group hover:bg-[#D4AF37]/5 transition-colors">
                <span className="text-white/20 text-[7px] font-black uppercase tracking-[0.4em] mb-1 group-hover:text-[#D4AF37] transition-colors">{stat.label}</span>
                <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}