# ROADMAP.md: EGRESSOS SI UEMG - Sistema de Acompanhamento de Egressos (UEMG)
>
> **Versão:** 3.0 (Consolidada)
> **Status:** Pronto para Execução
> **Baseado em:** `PROJECT_DNA.md` (v2.0) e `lessons_learned.md`

Este documento guia o desenvolvimento incremental do sistema, unindo os requisitos regulatórios (CEE/MG) com os requisitos sociais (Vagas/Feed).

---

## FASE 0: FUNDAÇÃO (Infra & Setup)

**Objetivo:** Ter um "Hello World" rodando na Vercel, conectado ao Supabase e com o Design System UEMG configurado.

- [ ] **Setup do Projeto (Next.js)**
  - [ ] Inicializar com `create-next-app` (App Router, TypeScript, ESLint).
  - [ ] Instalar `@supabase/ssr` (Client/Server clients).
  - [ ] **[L3]** Configurar `loading.tsx` base e Skeletons para evitar "flash" de conteúdo.

- [ ] **Design System (UI)**
  - [ ] Configurar Tailwind com cores institucionais (`#305B7D`, `#E31837`).
  - [ ] Instalar Shadcn/UI (Button, Input, Card, Toast, Dialog, Avatar).
  - [ ] Configurar fontes e ícones (Lucide React).

- [ ] **Banco de Dados (Supabase)**
  - [ ] Executar o script `schema_completo.sql` (v2.1) no SQL Editor.
  - [ ] **[L1]** Criar script de limpeza local (`TRUNCATE ... CASCADE`) para resets rápidos.
  - [ ] **[L5]** Implementar feedback visual na UI para "Cold Starts" do banco.

- [ ] **Autenticação Base**
  - [ ] Configurar Supabase Auth (Email/Senha).
  - [ ] **[L2]** Configurar Middleware (proteger `/app/(portal)` e `/app/(admin)`).

**DoD:** Projeto rodando na Vercel com login funcional e banco conectado.

---

## FASE 1: IDENTIDADE & CARREIRA (Single Player)

**Objetivo:** O usuário consegue logar, completar seu perfil e documentar sua trajetória (Core Acadêmico).

- [ ] **Onboarding**
  - [ ] Tela de Login e Recuperação de Senha.
  - [ ] **[L4]** Tratamento de erro `23505` (Email duplicado) com feedback amigável.
  - [ ] **[L10]** Script ou UI Admin para criar Professores/Coordenadores (bypass de confirmação de email).

- [ ] **Gestão de Perfil (Profile)**
  - [ ] CRUD da tabela `profiles` (Foto, Bio, Links).
  - [ ] **[L6]** Componentes de edição isolados (Client Components) para evitar conflitos de Server Actions.

- [ ] **Currículo Vivo**
  - [ ] CRUD de `academic_records` (Dados UEMG).
  - [ ] CRUD de `professional_history` (Experiência).
  - [ ] CRUD de `education_history` (Pós-graduação).
  - [ ] **[L7]** Tratamento de Datas: Usar strings ISO (`YYYY-MM-DD`) para inputs de data burocrática.

**DoD:** Aluno loga e cadastra onde trabalha. Dados persistem com RLS.

---

## FASE 2: REDE SOCIAL ACADÊMICA (Multiplayer)

**Objetivo:** Engajamento diário. Transformar o sistema em um "hub" de novidades.

- [ ] **Feed da Landing Page**
  - [ ] CRUD de `feed_posts` (Leitura pública).
  - [ ] Implementar política RLS para permitir leitura anônima na Home.
  - [ ] Componente de Postagem (apenas para Logados).

- [ ] **Diretório de Egressos**
  - [ ] Página de busca de colegas (Filtro por Ano/Empresa).
  - [ ] **[L8]** Auditoria de Privacidade: Garantir que dados sensíveis (Salário) não vazem no JSON do cliente.

---

## FASE 3: MERCADO DE OPORTUNIDADES (Value Loop)

**Objetivo:** O motivo do retorno. Conectar alunos a vagas.

- [ ] **Mural de Vagas**
  - [ ] CRUD de `opportunities` (Vagas de Estágio/Emprego).
  - [ ] Permissão: Professores e Alunos podem postar.

- [ ] **Interatividade (Checkbox)**
  - [ ] Implementar ação "Tenho Interesse" (Insert em `opportunity_interests`).
  - [ ] Implementar ação "Fui Contratado" (Documentação de sucesso).
  - [ ] **[L9]** UX: Botão Primário para "Interesse", Badge para "Contratado".

- [ ] **Hub de Mentoria**
  - [ ] Filtro no Diretório para `is_open_to_mentoring = true`.

**DoD:** Aluno vê vaga, marca interesse e professor vê quem se interessou.

---

## FASE 4: GESTÃO & COMPLIANCE (The Boss)

**Objetivo:** Ferramentas para a Coordenação (NDE).

- [ ] **Painel Administrativo**
  - [ ] Dashboard: "Quem está empregado?", "Média Salarial (Agregada)".
  - [ ] Moderação: Admin pode apagar posts ou vagas impróprias.

- [ ] **Relatórios CEE/MG**
  - [ ] Exportação de dados para conformidade com a Resolução 502/2025.

---

## FASE 5: FINALIZAÇÃO

**Objetivo:** Polimento para produção.

- [ ] **Testes & Segurança**
  - [ ] Verificar todas as políticas RLS.
  - [ ] Otimizar imagens (Next/Image).
  - [ ] Documentação final (`README.md`).

---

### LEGENDAS DE LIÇÕES APRENDIDAS (L)

*Consultar `lessons_learned.md` para detalhes técnicos.*

- **[L1]**: Limpeza Real (`TRUNCATE...CASCADE`).
- **[L2]**: Middleware Whitelist.
- **[L3]**: Skeletons UI.
- **[L4]**: Erro Postgres 23505.
- **[L5]**: Cold Starts Feedback.
- **[L6]**: Zod em Server Actions.
- **[L7]**: Datas/Timezones.
- **[L8]**: RLS Privacy.
- **[L9]**: Consistência Visual.
- **[L10]**: Supabase Admin Auth (Service Role).
