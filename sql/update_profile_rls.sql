-- Função auxiliar para obter o papel do usuário atual de forma segura (evitando recursão infinita)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Remove as políticas antigas para recriá-las corretamente
DROP POLICY IF EXISTS "Edicao de Perfis" ON public.profiles;
DROP POLICY IF EXISTS "Insercao de Perfis" ON public.profiles;
DROP POLICY IF EXISTS "Leitura de Perfis" ON public.profiles;
DROP POLICY IF EXISTS "Admin Total Access" ON public.profiles; -- Caso tenha sido criada manualmente

-- Política de Leitura: 
-- 1. O próprio usuário pode ler seu perfil.
-- 2. Administradores podem ler qualquer perfil.
-- 3. Membros do corpo docente (Professor/Coordenador) podem ler qualquer perfil.
-- 4. Alunos/Egressos podem ler perfis (exceto campos sensíveis se houver, mas aqui é leitura geral).
-- Vamos simplificar: Todos (inclusive visitantes) podem ler perfis básicos (para o diretório e feed)
CREATE POLICY "Leitura de Perfis"
ON public.profiles
FOR SELECT
TO public
USING (
  true
);

-- Política de Edição: 
-- 1. O próprio usuário pode editar seu perfil.
-- 2. Administradores e Coordenadores podem editar qualquer perfil.
CREATE POLICY "Edicao de Perfis"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id OR get_my_role() IN ('administrador', 'coordenador')
)
WITH CHECK (
  auth.uid() = id OR get_my_role() IN ('administrador', 'coordenador')
);

-- Política de Inserção:
-- 1. O próprio usuário pode inserir seu perfil (no cadastro via trigger ou client).
-- 2. Administradores e Coordenadores podem inserir perfis.
CREATE POLICY "Insercao de Perfis"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = id OR get_my_role() IN ('administrador', 'coordenador')
);
