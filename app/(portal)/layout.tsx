import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { signout } from "@/app/auth/actions"

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 hero-gradient z-0 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
                <div className="container flex h-16 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link className="mr-6 flex items-center space-x-2" href="/feed">
                            {/* Use logo or icon here if available, for now just text */}
                            <span className="hidden font-bold sm:inline-block text-white">
                                Acompanhamento de Egressos
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link
                                href="/feed"
                                className="transition-colors hover:text-white text-slate-400"
                            >
                                Feed
                            </Link>
                            <Link
                                href="/profile"
                                className="transition-colors hover:text-white text-slate-400"
                            >
                                Meu Perfil
                            </Link>
                            <Link
                                href="/directory"
                                className="transition-colors hover:text-white text-slate-400"
                            >
                                Diretório
                            </Link>
                            <Link
                                href="/jobs"
                                className="transition-colors hover:text-white text-slate-400"
                            >
                                Vagas
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            {/* Search to come */}
                        </div>
                        <nav className="flex items-center">
                            <div className="text-slate-400 text-sm mr-4 hidden md:block">
                                {user.email}
                            </div>
                            <form action={signout}>
                                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
                                    Sair
                                </Button>
                            </form>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1 relative z-10 container py-6">{children}</main>

            <footer className="w-full border-t border-white/10 bg-white/5 py-6 text-center text-sm md:text-left relative z-10 backdrop-blur-sm">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
                    <p className="text-slate-400">
                        &copy; {new Date().getFullYear()} Sistemas de Informação - UEMG Carangola.
                    </p>
                    <div className="flex gap-4">
                        <Link href="https://uemg.br" target="_blank" className="text-slate-400 hover:text-white hover:underline transition-colors">
                            UEMG Oficial
                        </Link>
                        <Link href="https://github.com/niltonfjunior2/egressos-si-uemg" target="_blank" className="text-slate-400 hover:text-white hover:underline transition-colors">
                            GitHub
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

import { Footer } from "@/components/footer"
