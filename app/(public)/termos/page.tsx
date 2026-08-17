import { BackButton } from "@/components/ui/back-button"

export const metadata = {
    title: 'Termos de Uso | Egressos SI UEMG',
    description: 'Termos e Condições de Uso da plataforma de Egressos de Sistemas de Informação da UEMG Carangola.',
}

export default function TermosPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="p-8 sm:p-12">
                    <BackButton />
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">Termos de Uso</h1>
                    
                    <div className="space-y-6 text-slate-600 dark:text-slate-300">
                        <p className="text-lg">
                            Ao acessar e utilizar o Sistema de Gestão de Egressos e Oportunidades do curso de Sistemas de Informação da UEMG Carangola, você concorda com os seguintes termos.
                        </p>

                        <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-md my-8">
                            <p className="font-medium text-primary-900 dark:text-primary-300">
                                O projeto foi aprovado no Edital 01/2026 do PROGRAMA DE APOIO A PROJETOS DE EXTENSÃO DA UEMG - PAEx/UEMG. O projeto está registrado no sistema SIGA sob o número 27831.
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">1. Propósito da Plataforma</h2>
                        <p>
                            A plataforma tem finalidade estritamente acadêmica e institucional, operando sob uma arquitetura de custo zero para a universidade. O sistema serve para:
                            (1) Atender ao compliance regulatório de acompanhamento de egressos e 
                            (2) Facilitar o networking e acesso a vagas de emprego e estágio.
                        </p>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">2. Papéis e Responsabilidades (RBAC)</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Alunos e Egressos:</strong> Devem fornecer dados verídicos sobre sua carreira e formação. Podem consumir conteúdo do Feed e interagir com vagas.</li>
                            <li><strong>Professores:</strong> Podem divulgar oportunidades, interagir no Feed e atuar como mentores.</li>
                            <li><strong>Coordenação e Administração:</strong> Têm a responsabilidade de gerir acessos, moderar postagens impróprias e extrair relatórios acadêmicos consolidados.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">3. Acesso a Funcionalidades</h2>
                        <p>
                            A fim de fomentar a completude dos dados institucionais, certas ações dentro da plataforma (como candidatar-se a vagas ou postar no mural) requerem que o seu perfil acadêmico e profissional esteja adequadamente preenchido.
                        </p>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">4. Regras de Conduta</h2>
                        <p>
                            O espaço da Rede Social Acadêmica deve manter decoro profissional. Postagens com conteúdo impróprio, falso ou que violem os princípios da UEMG estarão sujeitas a moderação, exclusão e eventual bloqueio de acesso ao usuário por parte da coordenação (Painel Administrativo).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
