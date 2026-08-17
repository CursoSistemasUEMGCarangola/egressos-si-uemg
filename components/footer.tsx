import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 text-center text-sm md:text-left">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-auto md:flex-row">
                <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground">
                        &copy; {new Date().getFullYear()} EGRESSOS SISTEMAS DE INFORMACAO - UEMG Carangola. Desenvolvido por alunos do curso de Sistemas de Informação.
                    </p>
                    <p className="text-muted-foreground text-xs italic max-w-2xl">
                        O projeto foi aprovado no Edital 01/2026 do PROGRAMA DE APOIO A PROJETOS DE EXTENSÃO DA UEMG - PAEx/UEMG. O projeto está registrado no sistema SIGA sob o número 27831.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/sobre" className="text-muted-foreground hover:underline font-medium">Sobre</Link>
                    <Link href="/termos" className="text-muted-foreground hover:underline font-medium">Termos</Link>
                    <Link href="/privacidade" className="text-muted-foreground hover:underline font-medium">Privacidade</Link>
                    <Link href="https://uemg.br" target="_blank" className="text-muted-foreground hover:underline">
                        UEMG Oficial
                    </Link>
                    <Link href="https://github.com/niltonfjunior2/egressos-si-uemg" target="_blank" className="text-muted-foreground hover:underline">
                        GitHub
                    </Link>
                </div>
            </div>
        </footer>
    )
}
