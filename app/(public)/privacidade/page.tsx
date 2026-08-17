import { BackButton } from "@/components/ui/back-button"

export const metadata = {
    title: 'Políticas de Privacidade | Egressos SI UEMG',
    description: 'Políticas de Privacidade e Tratamento de Dados da plataforma de Egressos de Sistemas de Informação da UEMG Carangola.',
}

export default function PrivacidadePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="p-8 sm:p-12">
                    <BackButton />
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">Políticas de Privacidade</h1>
                    
                    <div className="space-y-6 text-slate-600 dark:text-slate-300">
                        <p className="text-lg">
                            Nossa plataforma foi desenhada desde sua concepção priorizando a segurança da informação e a conformidade irrestrita com a Lei Geral de Proteção de Dados (LGPD).
                        </p>

                        <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-md my-8">
                            <p className="font-medium text-primary-900 dark:text-primary-300">
                                O projeto foi aprovado no Edital 01/2026 do PROGRAMA DE APOIO A PROJETOS DE EXTENSÃO DA UEMG - PAEx/UEMG. O projeto está registrado no sistema SIGA sob o número 27831.
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">1. Coleta e Visibilidade de Dados</h2>
                        <p>
                            Apenas dados estritamente necessários para a rede social acadêmica (Nome, Links do LinkedIn/GitHub, Área de Atuação) são visíveis publicamente ou para outros usuários.
                        </p>
                        <p>
                            <strong>Dados sensíveis são rigorosamente protegidos:</strong>
                            <br />
                            Informações como <em>faixa salarial</em>, <em>impacto na empregabilidade</em>, <em>sugestões avaliativas</em> e <em>e-mails alternativos</em> são visíveis <strong>exclusivamente</strong> para você e para a coordenação do curso. Esses dados são anonimizados quando agregados nos relatórios gerenciais do CEE/MG e nos dashboards institucionais.
                        </p>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">2. Segurança de Banco de Dados (RLS)</h2>
                        <p>
                            Utilizamos Row Level Security (RLS) diretamente na camada do banco de dados (PostgreSQL/Supabase). Isso garante matematicamente que nenhum usuário não autorizado consiga acessar ou consultar registros que não sejam de sua propriedade ou que não estejam explicitamente definidos como públicos.
                        </p>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">3. Comunicação e E-mails</h2>
                        <p>
                            Mantemos seu e-mail institucional seguro. Caso necessite recuperar o acesso, o sistema dispõe de rotinas que processam a segurança em <em>back-office</em> e disparam mensagens seguras via plataforma de e-mail (Brevo) para seu e-mail alternativo previamente cadastrado, evadindo eventuais bloqueios institucionais de firewall, mas sem expor seu e-mail alternativo a terceiros.
                        </p>

                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">4. Consentimento e Exclusão</h2>
                        <p>
                            Ao preencher as pesquisas institucionais (surveys), você aceita que seus dados agregados de forma anônima poderão ser usados para a prestação de contas da UEMG para com o Ministério da Educação e a Secretaria do Estado (relatórios).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
