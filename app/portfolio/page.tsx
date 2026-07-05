"use client"
import { PortfolioSection } from "@/components/portfolio-section"
import { useLanguageStore } from "@/components/store/useLanguageStore"

export default function PortfolioPage() {
  const { t } = useLanguageStore()

  return (
    <div className="bg-black min-h-screen relative w-full selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Background layer */}
      <div className="fixed inset-0 -z-10 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)'
        }}
      />

      <div className="relative z-10 pt-10">
        <section className="container mx-auto px-6 w-full">
          <h1 className="text-[12vw] md:text-[9rem] font-black text-white uppercase tracking-[-0.07em] leading-[0.75] mb-8">
            {t.portfolioHeroTop} <br />
            <span className="text-transparent italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              {t.portfolioHeroBottom}
            </span>
          </h1>
          <PortfolioSection />
        </section>
      </div>
    </div>
  )
}