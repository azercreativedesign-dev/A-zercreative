"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { useLanguageStore } from "@/components/store/useLanguageStore";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang={lang.toLowerCase()} suppressHydrationWarning>
      <body 
        className={`${inter.className} bg-black text-white antialiased selection:bg-[#D4AF37] selection:text-black`} 
        suppressHydrationWarning
      >
        <Header />

        {/* 
            The key={lang} forces a full re-render of children 
            whenever the language state changes.
        */}
        <main 
          key={lang}
          className="relative min-h-screen w-full flex flex-col" 
          style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top))' }}
        >
          {mounted ? children : <div className="bg-black min-h-screen" />}
        </main>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}