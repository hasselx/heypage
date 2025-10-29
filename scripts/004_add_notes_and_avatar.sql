-- Add notes column to links table
ALTER TABLE links ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add avatar_url column to profiles table (if not exists)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
