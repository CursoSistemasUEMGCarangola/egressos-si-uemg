import { BackButton } from "@/components/ui/back-button"

export const metadata = {
    title: 'Sobre o Projeto | Egressos SI UEMG',
    description: 'Saiba mais sobre a plataforma de Rastreamento de Egressos e Rede Social Acadêmica do curso de Sistemas de Informação da UEMG Carangola.',
}

export default function SobrePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="p-8 sm:p-12">
                    <BackButton />
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">Sobre o Projeto</h1>
                    
                    <div className="space-y-6 text-slate-600 dark:text-slate-300">
                        <p className="text-lg">
                            O Sistema de Gestão de Egressos e Oportunidades é uma plataforma híbrida dedicada ao curso de Sistemas de Informação da Universidade do Estado de Minas Gerais (UEMG) - Unidade Carangola.
                        </p>

                        <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-md my-8">
                            <p className="font-medium text-primary-900 dark:text-primary-300">
                                O projeto foi aprovado no Edital 01/2026 do PROGRAMA DE APOIO A PROJETOS DE EXTENSÃO DA UEMG - PAEx/UEMG. O projeto está registrado no sistema SIGA sob o número 27831.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">Nossos Objetivos</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                <strong>Rastreamento de Egressos (Compliance Regulatório):</strong> Atendimento direto à Resolução CEE/MG 502/2025, permitindo o acompanhamento da trajetória profissional e acadêmica dos formandos de maneira estruturada.
                            </li>
                            <li>
                                <strong>Rede Social Acadêmica (Engajamento):</strong> Fomento de networking, troca de conhecimentos, divulgação de vagas de emprego e criação de conexões valiosas entre alunos, egressos e professores.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">A Arquitetura Híbrida</h2>
                        <p>
                            Construída com foco na experiência do usuário e na escalabilidade, a plataforma opera com um ciclo de engajamento pelo valor: o aluno utiliza o sistema para buscar vagas do mercado local e nacional, e em contrapartida, enriquece a base de dados da instituição com suas informações de carreira. Tudo isso rodando numa arquitetura robusta, segura e moderna.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
