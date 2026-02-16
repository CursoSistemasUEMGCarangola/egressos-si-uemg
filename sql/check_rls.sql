-- Check if RLS is enabled on profiles table
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'profiles';

-- List all policies on profiles table
SELECT * 
FROM pg_policy 
WHERE polrelid = 'profiles'::regclass;
