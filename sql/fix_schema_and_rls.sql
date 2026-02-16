-- Add missing columns to opportunities table
ALTER TABLE public.opportunities 
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS location text;

-- Update RLS for Feed Posts
-- Drop old policies if they exist (legacy names)
DROP POLICY IF EXISTS "Gestao feed" ON public.feed_posts;
DROP POLICY IF EXISTS "Publico le feed" ON public.feed_posts;
DROP POLICY IF EXISTS "Usuarios postam feed" ON public.feed_posts;

-- Drop new policies if they exist (to make script idempotent and update them)
DROP POLICY IF EXISTS "Leitura Feed" ON public.feed_posts;
DROP POLICY IF EXISTS "Criacao Feed" ON public.feed_posts;
DROP POLICY IF EXISTS "Gestao Feed" ON public.feed_posts;

-- Read: Public (Everyone)
CREATE POLICY "Leitura Feed" ON public.feed_posts
FOR SELECT TO public USING (true);

-- Update/Delete: Owner or Admin/Coordenador
CREATE POLICY "Gestao Feed" ON public.feed_posts
FOR ALL TO authenticated USING (auth.uid() = author_id OR get_my_role() IN ('administrador', 'coordenador'));


-- Update RLS for Opportunities
-- Drop old policies
DROP POLICY IF EXISTS "Criacao de vagas" ON public.opportunities;
DROP POLICY IF EXISTS "Gestao de vagas" ON public.opportunities;
DROP POLICY IF EXISTS "Todos leem vagas" ON public.opportunities;

-- Drop new policies to update them
DROP POLICY IF EXISTS "Leitura Vagas" ON public.opportunities;
DROP POLICY IF EXISTS "Criacao Vagas" ON public.opportunities;
DROP POLICY IF EXISTS "Gestao Vagas" ON public.opportunities;

-- Read: Everyone authenticated
CREATE POLICY "Leitura Vagas" ON public.opportunities
FOR SELECT TO authenticated USING (true);

-- Insert: Authenticated users
CREATE POLICY "Criacao Vagas" ON public.opportunities
FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id OR get_my_role() IN ('administrador', 'coordenador'));

-- Update/Delete: Owner or Admin/Coordenador
CREATE POLICY "Gestao Vagas" ON public.opportunities
FOR ALL TO authenticated USING (auth.uid() = author_id OR get_my_role() IN ('administrador', 'coordenador'));
