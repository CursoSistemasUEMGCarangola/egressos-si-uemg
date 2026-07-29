# Relatório Técnico de Desenvolvimento: Plataforma Egressos SI UEMG

Este relatório compila as evidências empíricas e técnicas extraídas do repositório do projeto "Egressos SI UEMG", visando subsidiar a fundamentação da seção de Metodologia/Desenvolvimento de publicações acadêmicas.

---

## 1. Resumo da Arquitetura e Métricas do Projeto

### 1.1. Arquitetura Geral da Aplicação
O projeto foi desenvolvido sob a arquitetura do **Next.js App Router**, promovendo forte segregação estrutural entre componentes renderizados no servidor (Server Components) e no cliente (Client Components) para maximização de performance e segurança. A estrutura de diretórios foi definida da seguinte forma:
- **`/app/(public)`**: Concentra as rotas abertas, como a *Landing Page*, garantindo renderização estática rápida para indexação SEO e acesso de visitantes.
- **`/app/(portal)`**: Ambiente logado focado nos alunos e egressos. Concentra ferramentas de networking, mural de vagas (oportunidades) e o completamento de perfis, protegido por autenticação.
- **`/app/admin`**: Painel administrativo restrito à coordenação (NDE). Possui painéis de *Analytics* e gestão de usuários com bypass seletivo de *Row Level Security (RLS)*.

### 1.2. Modelagem de Dados Relacional (PostgreSQL / Supabase)
A camada de persistência foi estruturada no PostgreSQL através do Supabase, com emprego de identificadores universais únicos (`UUID`) como chaves primárias. Destacam-se as seguintes entidades centrais:
- **`profiles`**: Tabela âncora, lincada diretamente ao sistema de autenticação (`auth.users`), com campos para URLs, contatos e disponibilidade de mentoria, sob o papel (role) de *'aluno'*, *'egresso'* ou *'administrador'*.
- **`academic_records` & `education_history`**: Controlam, respectivamente, o vínculo original com a graduação e a educação continuada (pós-graduação, certificações).
- **`professional_history`**: Mapeia o histórico de mercado dos egressos (empresa, função, faixa salarial confidencial e *tech stack* associada).
- **`opportunities` & `opportunity_interests`**: Comportam o mural social, gerindo ofertas de emprego e os *matches* dos alunos interessados.
- **`profile_surveys`**: Tabela central para pesquisa socioacadêmica do NDE, desenhada especificamente para isolar as métricas de ensino (tecnologias faltantes, soft skills, impacto).

**Enums Definidos:** Foi feito amplo uso de restrições em nível de banco de dados (`CHECK`) e Arrays Nativos para garantir a consistência das opções de faixas salariais, modalidades de trabalho e interesses predefinidos.

---

## 2. Desafios de Engenharia e Soluções Práticas (Deep Dive Técnico)

### 2.1. Segurança de Dados e Conformidade com a LGPD
O banco de dados utiliza a premissa de *Row Level Security (RLS)* estrito. A tabela `profile_surveys` (questionário acadêmico) foi desenvolvida com foco total em privacidade.
- **Lógica de Isolamento**: As políticas (Policies) foram definidas de modo que um usuário comum só pode fazer `SELECT`, `INSERT` ou `UPDATE` nos seus próprios dados (`profile_id = auth.uid()`).
- Para permitir que o painel do administrador (NDE) gerasse insights agregados sobre toda a base sem desativar a política de segurança, implementou-se um *Service Role Client* (`createAdminClient`) utilizado **estritamente em rotas administrativas protegidas no lado do servidor**, gerando o *bypass* seguro necessário apenas para relatórios não individualizados.

### 2.2. Autorização em Server Actions e Proteção contra BAC
Havia um risco latente de **Broken Access Control (BAC)**, em que usuários comuns poderiam tentar disparar diretamente rotas assíncronas do lado do servidor (Server Actions) destinadas à administração.
- **Solução Implementada**: Criação do utilitário interno `checkAdminAccess()`. Ele é injetado sistematicamente na **primeira linha** de todas as funções sensíveis (ex: `/app/admin/users/actions.ts`), barrando instantaneamente qualquer requisição que não possua tanto o token de autenticação válido quanto o papel de autorização RBAC específico (administrador).

### 2.3. Contorno de Bloqueios Institucionais de E-mail
O ambiente acadêmico frequentemente sofre com o bloqueio (Spam/Firewall) de e-mails transacionais não autorizados previamente pela TI.
- **Solução Implementada**: A plataforma desacoplou o envio rudimentar e adotou o **Brevo SDK** para despachos confiáveis e profissionais via HTML. Para mitigar o travamento na hora da criação da conta institucional, introduziu-se a lógica do `alternative_email` na tabela de perfis, assegurando a capacidade de recuperação de conta e comunicação contínua mesmo em caso de falha da caixa `@uemg.br`.

### 2.4. Performance: Transição Nativa vs. CDN (Widget Externalizado)
A arquitetura anterior carregava um "Feed" nativo, o que acumulava processamento excessivo e problemas de hidratação (como inconsistências geradas pela função relacional de datas `formatDistanceToNow` no *Server vs Client*).
- **Estratégia "Kill The Feed"**: Destruição proposital das tabelas de postagens (`feed_posts`).
- **Implementação Assíncrona**: O feed nativo foi substituído por um componente externo (Elfsight CDN Widget) injetado através da tag `<Script>` otimizada do Next.js. O resultado foi um alívio da carga de banco de dados e mitigação imediata dos alertas de *Core Web Vitals*, terceirizando o peso do tráfego visual para a CDN do provedor, com tratamento de *lazy load*.

---

## 3. Fluxo do Profile Wizard (Pesquisa Socioacadêmica)

O completamento de perfil não é um formulário estático, mas sim um assistente interativo em etapas (*wizard*) validado com alta usabilidade, combinando a construção do currículo do aluno com a extração de inteligência para o NDE. Ele ocorre em 6 passos:

1. **Dados Pessoais & Mudança de Estado**: Captação de nome, contato e urls sociais. Realiza o cálculo lógico do ano de conclusão, ofertando dinamicamente ao aluno a opção de migrar sua *Role* para "Egresso" caso sua data de formação seja passada.
2. **Experiência Profissional Atual**: Coleta empresa, cargo, pacote de tecnologias usadas (*Tech Stack* text-area) e range salarial confidencial. 
3. **Formação Complementar**: Possibilita o cadastro dinâmico de especializações, mestrados ou certificações via estado local de arrays.
4. **Pesquisa de Impacto do Curso**: O core acadêmico do assistente. Extrai (através de checkboxes de múltipla escolha ou opções personalizadas *"Outro"*) as áreas curriculares mais úteis, competências comportamentais em falta e tecnologias não vistas na grade.
5. **Disponibilidade para Mentoria**: Configuração simples que atualiza um booleano `is_open_to_mentoring`, definindo se o egresso aceita ser acionado pelos calouros.
6. **Sugestões Livres e Finalização**: Campo aberto para *feedbacks* qualitativos diretos à coordenação, resultando na persistência atômica da tabela `profile_surveys`.

Todos os formulários e rotas passam por uma checagem rigorosa antes da mutação SQL ser submetida.

---

## 4. Painel de Inteligência de Dados (Dashboard do NDE)

O dashboard (`/app/admin/page.tsx`) materializa os dados brutos recolhidos pela *Profile Survey*, agregando a informação no servidor e entregando aos coordenadores blocos visuais de decisão sem expor dados nominais sensíveis.

- **Tratamento de Arrays de Múltipla Escolha**: Para dados estruturados em banco como *Arrays Nativos* do PostgreSQL (ex: `most_useful_areas`, `soft_skills_desired`), a lógica em TypeScript aplica um método iterativo funcional (`aggregateArrayField`) que mapeia, incrementa num dicionário chave-valor e ordena os resultados, exibindo as top 5 opções na forma de barras de progresso percentuais.
- **Processamento Qualitativo de Texto Livre (Tecnologias em Falta)**: Para lidar com o texto não estruturado enviado na pesquisa (`missing_technologies`), a aplicação realiza uma mineração literal. O texto livre é quebrado (*split*) com expressões regulares cobrindo espaçamentos e pontuações variadas (`/[\s,;./\-\n]+/`); os tokens extraídos passam por um filtro dinâmico de eliminação de pronomes e preposições vulgares (*Stop Words*). O resultado culmina numa métrica de contagem (frequência de palavras), renderizada na interface do administrador na forma de uma *Tag Cloud*, com ponderação algorítmica ajustando a opacidade e o tamanho da fonte (ex: se o *peso* da palavra exceder 66% das menções totais).
