-- Check if 'jobs' and 'opportunities' tables exist
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('jobs', 'opportunities', 'feed_posts');

-- Check RLS status for these tables
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname IN ('jobs', 'opportunities', 'feed_posts');

-- List policies for these tables
SELECT polname, relname, polcmd, polroles
FROM pg_policy p
JOIN pg_class c ON p.polrelid = c.oid
WHERE c.relname IN ('jobs', 'opportunities', 'feed_posts');
