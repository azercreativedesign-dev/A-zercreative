"use client"
import { Facebook, Instagram, Twitter, ChevronRight } from "lucide-react";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguageStore } from "@/components/store/useLanguageStore"

export function ContactSection() {
  const { t } = useLanguageStore()
  const [formState, setFormState] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitStatus("success")
    setFormState({ name: "", email: "", company: "", service: "", budget: "", message: "" })
    setTimeout(() => setSubmitStatus("idle"), 5000)
  }

  return (
    <section id="contact" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Column: Contact Info */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <div className="w-12 h-1 bg-[#D4AF37] mb-6" />
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                {t.getIn} <br /><span className="text-[#D4AF37]">{t.touch}</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">{t.contactDesc}</p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/50 transition-all group">
                <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-2">{t.secureEmail}</p>
                <a href="mailto:arifcreativedesign@gmail.com" className="text-lg font-bold group-hover:text-[#D4AF37] transition-colors">
                  azercreativedesign@gmail.com
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/50 transition-all group">
                <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-2">{t.hotline}</p>
                <a href="tel:+251953134822" className="text-lg font-bold group-hover:text-[#D4AF37] transition-colors">
                  +251 953 134 822
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{t.presence}</p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={22} />, link: "https://instagram.com/azer.design" },
                  { icon: <Facebook size={22} />, link: "#" },
                  { icon: <Twitter size={22} />, link: "#" }
                ].map((social, i) => (
                  <a key={i} href={social.link} className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-black hover:bg-[#D4AF37] transition-all duration-500">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8 bg-black/40 p-10 md:p-14 rounded-[2.5rem] border border-[#D4AF37]/20 shadow-2xl backdrop-blur-md">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{t.fullName}</label>
                  <input 
                    type="text" required value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 focus:border-[#D4AF37] outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{t.emailAddr}</label>
                  <input 
                    type="email" required value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 focus:border-[#D4AF37] outline-none transition-all"
                  />
                </div>
              </div>

              {/* SERVICE SELECTION AREA */}
              <div className="space-y-5">
                <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{t.capability}</label>
                <div className="flex flex-wrap gap-3">
                  {/* Changed t.services to t.serviceList */}
                  {t.serviceList.map((s) => (
                    <button 
                      key={s} type="button"
                      onClick={() => setFormState({...formState, service: s})}
                      className={cn(
                        "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-500",
                        formState.service === s 
                          ? "bg-[#D4AF37] border-[#D4AF37] text-black" 
                          : "bg-transparent border-white/5 text-gray-500 hover:border-[#D4AF37]/40 hover:text-white"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{t.brief}</label>
                <textarea 
                  required rows={4} value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 focus:border-[#D4AF37] outline-none transition-all resize-none"
                  placeholder={t.vision}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                <div className="flex items-center gap-3 text-gray-500">
                   <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                   <p className="text-[9px] font-bold uppercase tracking-[0.3em]">{t.encrypted}</p>
                </div>
                <Button 
                  type="submit" disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#D4AF37] hover:bg-white text-black font-black uppercase tracking-widest h-16 px-16 rounded-full flex items-center justify-center gap-4 group transition-all duration-700"
                >
                  {isSubmitting ? t.transmitting : t.initiate}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              {submitStatus === "success" && (
                <div className="mt-6 p-4 bg-[#D4AF37] text-black rounded-xl text-center">
                  <p className="text-xs font-black uppercase tracking-widest">{t.success}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}