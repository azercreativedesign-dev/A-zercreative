"use client"

import { ServicesSection } from "@/components/services-section"
import { useLanguageStore } from "@/components/store/useLanguageStore"

/**
 * ServicesPage Component
 * Renders the core capabilities of the platform with high-fidelity 
 * typography and a dynamic background grid.
 */
export default function ServicesPage() {
  // Accessing the translation object 't' directly from the store.
  // This is now type-safe thanks to the TranslationSchema interface.
  const { t } = useLanguageStore();

  return (
    <div className="bg-black min-h-screen relative w-full selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* 
          DYNAMINC BACKGROUND LAYER 
          A fixed grid overlay with a radial mask for a high-tech aesthetic.
      */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.1) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(212,175,55,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)'
        }}
      />

      {/* 
          MAIN CONTENT SECTION 
          Z-index is set to 10 to ensure content sits above the background grid.
      */}
      <section className="relative z-10 pt-10 pb-12 w-full">
        <div className="container mx-auto px-6 w-full">
          
          {/* 
              HERO TYPOGRAPHY
              The "coreTitle" and "services" strings are pulled dynamically 
              from useLanguageStore.
          */}
          <h1 className="text-[12vw] md:text-[9rem] font-black text-white uppercase tracking-[-0.07em] leading-[0.75] mb-10">
            {t.coreTitle} <br />
            <span 
              className="text-transparent italic" 
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
            >
              {t.services}
            </span>
          </h1>

          {/* 
              CAPABILITIES GRID
              The sub-component that maps through individual service cards.
          */}
          <ServicesSection />
          
        </div>
      </section>
    </div>
  )
}
