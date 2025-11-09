/*
  # Update mood_entries user_id constraint

  1. Changes
    - Remove foreign key constraint on user_id
    - Change user_id to allow any UUID (for mock users)
    - Keep all RLS policies and indexes intact

  2. Security
    - RLS policies still ensure users can only access their own data
    - All security measures remain in place
*/

-- Drop the existing foreign key constraint
ALTER TABLE mood_entries 
DROP CONSTRAINT IF EXISTS mood_entries_user_id_fkey;

-- Recreate the column without foreign key (but keep it as uuid and not null)
-- The column already exists, so we just need to ensure it has the right properties
ALTER TABLE mood_entries 
ALTER COLUMN user_id SET NOT NULL;

-- Add a comment to document this is intentionally not a foreign key
COMMENT ON COLUMN mood_entries.user_id IS 'User ID - can be from auth.users or mock user ID for testing';
