"use client"

import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { FeedSection } from "@/components/landing/feed-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { ElectionHero } from "@/components/landing/election-hero"

interface PageContentProps {
  mentors: any[]
  jobs: any[]
  isElectionMode: boolean
}

export function PageContent({ mentors, jobs, isElectionMode }: PageContentProps) {
  if (isElectionMode) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <main className="flex-1 flex flex-col items-center justify-center">
            <ElectionHero />
            <div className="w-full">
              <FeedSection mentors={mentors} jobs={jobs} hideInstagramFeed={true} />
            </div>
        </main>
        <footer className="w-full bg-slate-200 dark:bg-slate-950/50 border-t border-slate-300 dark:border-slate-800 p-6 text-center text-xs text-slate-600 dark:text-slate-400 mt-auto">
            <div className="flex flex-col gap-2 items-center justify-center max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <Link href="/sobre" className="hover:text-primary transition-colors font-medium">Sobre o Projeto</Link>
                    <Link href="/termos" className="hover:text-primary transition-colors font-medium">Termos de Uso</Link>
                    <Link href="/privacidade" className="hover:text-primary transition-colors font-medium">Políticas de Privacidade</Link>
                </div>
                <p className="mt-2 text-[10px] opacity-70">
                    O projeto foi aprovado no Edital 01/2026 do PROGRAMA DE APOIO A PROJETOS DE EXTENSÃO DA UEMG - PAEx/UEMG. O projeto está registrado no sistema SIGA sob o número 27831.
                </p>
                <p className="mt-2">
                    &copy; {new Date().getFullYear()} Egressos Sistemas de Informação
                </p>
            </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <FeedSection mentors={mentors} jobs={jobs} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
