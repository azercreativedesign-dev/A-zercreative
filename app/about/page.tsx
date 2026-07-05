"use client"
// NAMED IMPORT: Braces {} are required because we used 'export function'
import { AboutSection } from "@/components/about-section"

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen relative w-full selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* BACKGROUND ARCHITECTURE: GOLD GRID */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.1) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(212,175,55,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 85%)'
        }}
      />

      {/* AMBIENT VISUAL DEPTH */}
      <div className="fixed top-[-10%] right-[-10%] w-125 h-125 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* MAIN CONTENT WRAPPER */}
      <main className="relative z-10 pt-32 pb-20">
        <AboutSection />
      </main>
      
    </div>
  )
}