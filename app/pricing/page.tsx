"use client"
import { PricingSection } from "@/components/pricing-section"
import { useLanguageStore } from "@/components/store/useLanguageStore"
import { ShieldCheck, Zap, Diamond, BarChart3 } from "lucide-react"

export default function PricingPage() {
  const { t } = useLanguageStore()

  return (
    <div className="bg-black min-h-screen relative selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* Background grid */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)'
        }}
      />

      <div className="relative z-10">
        <section className="relative pt-12 pb-12 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-20">
              <h1 className="text-[12vw] md:text-[9rem] font-black text-white uppercase tracking-[-0.07em] leading-[0.75] mb-10">
                {t.pricingValue} <br />
                <span className="text-transparent italic" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>
                  {t.pricingTiers}
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-6xl mx-auto mb-12">
              {[
                { label: t.executionLabel, value: t.bespokeValue, icon: <Zap size={32} /> },
                { label: t.securityLabel, value: t.verifiedValue, icon: <ShieldCheck size={32} /> },
                { label: t.strategyLabel, value: t.eliteValue, icon: <Diamond size={32} /> },
                { label: t.scalabilityLabel, value: t.infiniteValue, icon: <BarChart3 size={32} /> },
              ].map((item, i) => (
                <div key={i} className="bg-black/60 p-12 group hover:bg-[#D4AF37]/5 transition-all duration-700">
                  <div className="text-[#D4AF37] mb-8">{item.icon}</div>
                  <p className="text-[9px] text-[#D4AF37]/40 uppercase tracking-[0.5em] mb-2 font-black">{item.label}</p>
                  <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">{item.value}.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <PricingSection />
      </div>
    </div>
  )
}