# PROJECT DNA: EGRESSOS SI UEMG - Sistema de Gestão de Egressos e Oportunidades
>
> **Versão:** 2.0 | **Status:** Pronto para Desenvolvimento
> **Fonte da Verdade:** Este arquivo governa todas as decisões de arquitetura e código.

## 1. MISSION STATEMENT (Visão)

**Role:** Você é o Tech Lead Sênior deste projeto.
**Objetivo:** Desenvolver uma plataforma híbrida de **Rastreamento de Egressos** (Compliance Regulatório) e **Rede Social Acadêmica** (Engajamento) para o curso de Sistemas de Informação da UEMG Carangola.
**Drivers de Negócio:**

- **Engajamento pelo Valor:** O aluno usa o sistema para buscar vagas (valor imediato) e, em troca, fornece dados de carreira (valor para a UEMG).
- **Custo Zero:** Arquitetura 100% Free Tier (Vercel + Supabase).
- **Compliance:** Atendimento à Resolução CEE/MG 502/2025 (Acompanhamento de Egressos).

## 2. RESTRIÇÕES INVIOLÁVEIS (The Hard Box)

- **Infraestrutura:** Frontend na Vercel, Backend/DB no Supabase.
- **Segurança:** Autenticação via Supabase Auth. Nenhuma rota administrativa pública.
- **Identidade Visual:** Uso estrito das cores institucionais UEMG.
- **Banco de Dados:** Chaves primárias `UUID`. Uso mandatório de RLS (Row Level Security).
- **Idioma:** Banco de dados e Interface 100% em Português (pt-BR).

## 3. CANVAS DE ARQUITETURA PROFUNDA

| Dimensão | Decisão Arquitetural | Justificativa |
| :--- | :--- | :--- |
| **Atores** | RBAC em Português | `aluno`, `egresso`, `professor` (pode postar), `coordenador` (admin), `administrador` (root). |
| **Social** | Feed & Vagas | Mural de oportunidades e Feed de notícias para gerar retenção diária. |
| **Privacidade** | LGPD Strict | Salários e dados sensíveis são visíveis apenas ao dono e à coordenação (anonimizados em relatórios). |
| **Interface** | Shadcn/UI + Tailwind | Design minimalista, responsivo e acessível. |

## 4. TECH STACK (Source of Truth)

- **Framework:** Next.js 14+ (App Router).
- **Linguagem:** TypeScript 5.x (Strict Mode).
- **Estilo:** Tailwind CSS.
- **Banco:** PostgreSQL (Supabase) via `supabase-js` client (Sem Prisma).
- **Ícones:** Lucide React.

### Paleta de Cores (Institucional UEMG)

- **Azul Primário:** `#305B7D` (R48 G91 B125)
- **Vermelho Primário:** `#E31837` (R227 G24 B55)
- **Secundárias:**
  - Azul Escuro: `#002B5C`
  - Vinho: `#820024`
  - Ouro: `#A39900`
  - Cinza Neutro: `#CED0D2`

## 5. DIRETRIZES DE ENGENHARIA

1. **Estrutura de Pastas:**
   - `/app/(portal)`: Área do Aluno/Egresso (Vagas, Feed, Perfil).
   - `/app/(admin)`: Área da Coordenação (Dashboards, Relatórios).
   - `/app/(public)`: Landing Page (Feed público).
2. **Segurança de Dados:**
   - Nunca expor a tabela `profiles` inteira no frontend.
   - Tratar `auth.users` e `public.profiles` como entidades separadas mas vinculadas.

---
FIM DO ARQUIVO
