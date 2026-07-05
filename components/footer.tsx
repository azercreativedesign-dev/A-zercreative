"use client"
import Link from "next/link"
import Image from "next/image"
import { MoveUpRight, Instagram, Linkedin, Twitter, Facebook, ArrowUp, Fingerprint, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguageStore } from "@/components/store/useLanguageStore"

export const Footer = () => {
  const [year, setYear] = useState<number | null>(null)
  const { t } = useLanguageStore()

  useEffect(() => { 
    setYear(new Date().getFullYear()) 
  }, [])

  const navGroups = [
    {
      title: t.navigation,
      links: [
        { name: t.about, href: "/about" },
        { name: t.portfolio, href: "/portfolio" },
        // FIXED: Changed t.services_nav to t.services (the single string)
        { name: t.services, href: "/services" }, 
        { name: t.pricing, href: "/pricing" }
      ]
    },
    {
      title: t.legals,
      links: [
        { name: t.privacy, href: "/privacy" },
        { name: t.terms, href: "/terms" },
        { name: t.cookies, href: "/cookies" },
        { name: t.license, href: "/license" }
      ]
    }
  ]

  return (
    <footer className="relative bg-black border-t border-white/3 pt-32 pb-12 overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* Ambient Background Text */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
        <h2 className="text-[35vw] font-black text-white/1 uppercase leading-none opacity-50">AZER</h2>
      </div>

      <div className="max-w-360 mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-24 border-b border-white/5">
          
          {/* Column 1: Monolith Identity */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start">
            <div className="space-y-12">
              <div className="relative w-28 h-28">
                <Image src="/logo.png" alt="A-Zer" fill className="object-contain" />
              </div>
              <div className="space-y-6">
                <h3 className="text-white text-5xl font-light tracking-tighter leading-none">
                  {t.concept} <span className="text-[#D4AF37] font-black italic">{t.to}</span> {t.screen}.
                </h3>
                <p className="text-white/30 text-lg max-w-sm leading-relaxed">{t.footerDesc}</p>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-6 p-1 border border-white/5 rounded-full bg-white/2">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
                <Fingerprint size={12} className="text-[#D4AF37]" />
                <span className="text-[8px] font-black text-white/60 uppercase tracking-[0.3em]">AZER_OS v2.6</span>
              </div>
              <div className="flex items-center gap-2 pr-4">
                <div className="w-1 h-1 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">System_Online</span>
              </div>
            </div>
          </div>

          {/* Column 2: Directory Links */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-12">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-8">
                <h4 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.8em] opacity-40">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="group flex items-center text-xl font-bold text-white transition-all hover:text-[#D4AF37] hover:translate-x-2">
                        <span className="opacity-0 group-hover:opacity-100 text-[#D4AF37] mr-3">/</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Presence & Lead Capture */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.8em] opacity-40">{t.presenceTitle}</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'IG', icon: Instagram },
                { name: 'LN', icon: Linkedin },
                { name: 'TW', icon: Twitter },
                { name: 'FB', icon: Facebook }
              ].map((social) => (
                <Link key={social.name} href="#" className="group flex flex-col justify-between p-6 h-32 border border-white/10 rounded-2xl bg-white/1 hover:border-[#D4AF37]/40 transition-all">
                  <div className="flex justify-between">
                    <social.icon size={18} className="text-white/20 group-hover:text-[#D4AF37]" />
                    <MoveUpRight size={14} className="text-white/5 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black text-white/40 group-hover:text-white uppercase">{social.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Communication Protocol / Newsletter */}
            <div className="space-y-4 pt-4">
              <h4 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.8em] opacity-40 italic">{t.protocolTitle}</h4>
              <div className="relative group overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/2 p-1 focus-within:border-[#D4AF37]">
                <div className="flex items-center">
                  <div className="pl-4 text-[#D4AF37]"><Zap size={14} /></div>
                  <input 
                    type="email" 
                    placeholder={t.joinCommunity} 
                    className="w-full bg-transparent px-4 py-4 text-[10px] font-black text-white focus:outline-none placeholder:text-white/20" 
                  />
                  <button className="mr-1 bg-[#D4AF37] px-6 py-3 rounded-lg text-[10px] font-black text-black uppercase hover:bg-white transition-colors">
                    {t.submit}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Signature Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group">
               <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">
                 Developed by <span className="text-white group-hover:text-[#D4AF37]">AZER</span>
               </span>
            </div>
            <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
              &copy; {year ?? '2026'} // ALL_SYSTEMS_NOMINAL
            </span>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-4 px-6 py-3 rounded-full border border-white/5 hover:border-[#D4AF37] transition-all"
          >
             <span className="text-[9px] font-black text-white/20 group-hover:text-white uppercase tracking-[0.4em]">{t.ascent}</span>
             <ArrowUp size={14} className="text-[#D4AF37] group-hover:-translate-y-1 transition-all" />
          </button>
        </div>
      </div>
    </footer>
  )
}