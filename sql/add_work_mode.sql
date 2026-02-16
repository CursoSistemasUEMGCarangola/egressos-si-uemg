-- Add work_mode column to opportunities table
ALTER TABLE public.opportunities 
ADD COLUMN IF NOT EXISTS work_mode text CHECK (work_mode = ANY (ARRAY['presencial'::text, 'remoto'::text, 'hibrido'::text]));
