'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguageStore } from '@/components/store/useLanguageStore'
import { cn } from '@/lib/utils'

export default function Header() {
  const { t, lang, setLanguage } = useLanguageStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent background content from scrolling when menu is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinks = [
    { name: t.about, href: '/about' },
    { name: t.portfolio, href: '/portfolio' },
    { name: t.services, href: '/services' },
    { name: t.pricing, href: '/pricing' },
    { name: t.contact, href: '/contact' },
  ]

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full transition-all duration-700 px-4 md:px-12 py-3 md:py-4 border-b",
        "z-[9998]", 
        isScrolled 
          ? "bg-black/95 backdrop-blur-2xl border-white/10 shadow-2xl" 
          : "bg-transparent border-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          
          {/* BRAND IDENTITY */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-1 md:gap-1.5 group">
              {/* LOGO ICON - INCREASED SIZE */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-700 group-hover:scale-110">
                <Image 
                  src="/logo.png" 
                  alt="A-ZER Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>

              {/* BRAND TEXT - WITH GOLD COLOR FILTER */}
              <div className="relative w-24 md:w-32 h-10 md:h-12 shrink-0 transition-transform duration-700 group-hover:scale-105" style={{ filter: 'brightness(1.1) saturate(1.2)' }}>
                <Image 
                  src="/azer-text-logo.png" 
                  alt="A-ZER From Concept to Screen" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center justify-center gap-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-white text-[11px] font-black uppercase transition-all hover:text-[#D4AF37] relative group/link",
                  lang === 'ET' ? "tracking-normal text-[13px]" : "tracking-[0.4em]"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#D4AF37] transition-all duration-500 group-hover/link:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-5 border-r border-white/10 pr-8">
              {['EN', 'ET'].map((l) => (
                <button 
                  key={l}
                  onClick={() => setLanguage(l)} 
                  className={cn(
                    "text-[10px] font-black tracking-widest transition-all",
                    lang === l ? 'text-[#D4AF37] scale-110' : 'text-white/20 hover:text-white'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link 
              href="/contact" 
              className="bg-[#D4AF37] text-black px-6 md:px-9 py-2.5 md:py-3.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#D4AF37]/5"
            >
              {t.getQuote}
            </Link>

            {/* MOBILE HAMBURGER */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex lg:hidden flex-col gap-1.5 items-end p-2"
            >
              <div className="h-0.5 w-8 bg-white" />
              <div className="h-0.5 w-5 bg-[#D4AF37]" />
              <div className="h-0.5 w-7 bg-white" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={cn(
        "fixed inset-0 bg-[#050505] z-[9999] flex flex-col transition-all duration-500 ease-in-out",
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-1.5">
             <div className="relative w-8 h-8">
               <Image src="/logo.png" alt="A-ZER" fill className="object-contain" />
             </div>
             <div className="relative w-20 h-6" style={{ filter: 'brightness(1.1) saturate(1.2)' }}>
               <Image src="/azer-text-logo.png" alt="A-ZER" fill className="object-contain" />
             </div>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-10 px-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-white text-4xl font-black uppercase transition-colors hover:text-[#D4AF37]",
                lang === 'ET' ? "tracking-normal" : "tracking-tighter text-center"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex gap-12 mt-10 pt-10 border-t border-white/5 w-full justify-center">
            {['EN', 'ET'].map((l) => (
              <button 
                key={l}
                onClick={() => { setLanguage(l); setIsMenuOpen(false); }} 
                className={cn(
                  "text-lg font-black uppercase transition-all",
                  lang === l ? 'text-[#D4AF37] scale-125' : 'text-white/20'
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
