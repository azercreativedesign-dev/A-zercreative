"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguageStore } from "@/components/store/useLanguageStore"
import { ArrowUpRight, ShieldCheck } from "lucide-react"

export function PricingSection() {
  const { t } = useLanguageStore()

  const pricingPlans = [
    {
      name: t.starterPlan,
      price: "15,000", 
      currency: "ETB",
      features: t.serviceList.slice(0, 3),
      cta: t.requestProposal,
    },
    {
      name: t.growthPlan,
      price: "45,000",
      currency: "ETB",
      popular: true,
      features: t.serviceList,
      cta: t.getStarted,
    },
    {
      name: t.premiumPlan,
      price: "95,000",
      currency: "ETB",
      features: [...t.serviceList, "Global Access"],
      cta: t.getQuote,
    },
  ]

  const paymentLogos = [
    { name: "TELEBIRR", src: "/images/payments/telebirr.png" },
    { name: "CBE BIRR", src: "/images/payments/cbe.png" },
    { name: "MASTERCARD", src: "/images/payments/mastercard.png" },
    { name: "USDT (TRC20)", src: "/images/payments/usdt.png" }
  ]

  return (
    <section id="pricing" className="relative bg-transparent pb-24 antialiased">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- PLAN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={cn(
                "group relative flex flex-col transition-all duration-[1.5s] ease-out",
                plan.popular ? "md:-translate-y-8" : ""
              )}>
              <div className="relative flex flex-col bg-black border border-white/5 h-full transition-colors group-hover:border-[#D4AF37]/30">
                <div className={cn("absolute top-0 left-0 w-full h-0.5", plan.popular ? "bg-[#D4AF37]" : "bg-white/10")} />

                <div className="p-10 pb-0">
                  <h3 className={cn("text-4xl font-black uppercase tracking-tighter mb-8", plan.popular ? "text-[#D4AF37]" : "text-white")}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-black text-white tracking-tighter leading-none">
                      {plan.price}
                    </span>
                    <span className="text-[11px] font-black text-[#D4AF37] vertical-text rotate-180 uppercase tracking-widest leading-none">
                      {plan.currency}
                    </span>
                  </div>
                </div>

                <div className="p-10 grow flex flex-col">
                  <div className="w-full h-px bg-linear-to-r from-[#D4AF37]/40 to-transparent mb-10" />
                  <div className="space-y-6 mb-16">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                          {feat}
                        </span>
                        <div className="h-px w-full bg-white/5" />
                      </div>
                    ))}
                  </div>

                  <Button asChild className={cn(
                      "w-full h-16 font-black uppercase tracking-[0.5em] text-[10px] transition-all rounded-none border-none",
                      plan.popular ? "bg-[#D4AF37] text-black hover:bg-white" : "bg-white/5 text-white hover:bg-[#D4AF37] hover:text-black"
                    )}>
                    <Link href="/contact" className="flex items-center justify-center gap-4">
                      {plan.cta}
                      <ArrowUpRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- SETTLEMENT CENTER --- */}
        <div className="relative border border-white/10 bg-black/40 backdrop-blur-3xl p-16">
          <div className="flex flex-col gap-16 relative z-10">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[1.2em] ml-[1.2em]">
                {t.settlementTitle}
              </span>
              <div className="w-32 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {paymentLogos.map((logo) => (
                <div key={logo.name} className="flex flex-col items-center gap-8">
                  {/* Fixed: Grayscale removed, opacity high by default */}
                  <div className="relative w-full h-12 opacity-90 transition-transform duration-700 hover:scale-110">
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 tracking-[0.5em] uppercase">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vertical-text { writing-mode: vertical-rl; }
      `}</style>
    </section>
  )
}