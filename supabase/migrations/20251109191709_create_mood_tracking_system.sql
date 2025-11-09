/*
  # Create Mood Tracking System

  1. New Tables
    - `mood_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `primary_mood` (text)
      - `mood_intensity` (integer)
      - `energy_level` (text)
      - `sleep_hours` (numeric)
      - `sleep_quality` (text)
      - `stress_level` (text)
      - `activities` (jsonb)
      - `nutrition` (text)
      - `physical_activity` (jsonb)
      - `screen_time` (numeric)
      - `medication_compliance` (jsonb)
      - `triggers` (text)
      - `social_interactions` (text)
      - `gratitude` (text)
      - `notes` (text)
      - `weather` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `mood_entries` table
    - Add policies for authenticated users to manage their own mood entries
*/

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  primary_mood text NOT NULL,
  mood_intensity integer NOT NULL DEFAULT 5 CHECK (mood_intensity >= 1 AND mood_intensity <= 10),
  energy_level text DEFAULT 'Medium',
  sleep_hours numeric DEFAULT 8,
  sleep_quality text DEFAULT 'Average',
  stress_level text DEFAULT 'Medium',
  activities jsonb DEFAULT '[]'::jsonb,
  nutrition text DEFAULT 'Balanced',
  physical_activity jsonb DEFAULT '{"minutes": 0, "type": ""}'::jsonb,
  screen_time numeric DEFAULT 4,
  medication_compliance jsonb DEFAULT '{"taken": false, "notes": ""}'::jsonb,
  triggers text DEFAULT '',
  social_interactions text DEFAULT '',
  gratitude text DEFAULT '',
  notes text DEFAULT '',
  weather text DEFAULT 'Sunny',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_date ON mood_entries(date);
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_date ON mood_entries(user_id, date);

-- Enable RLS
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own mood entries
CREATE POLICY "Users can view own mood entries"
  ON mood_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own mood entries
CREATE POLICY "Users can insert own mood entries"
  ON mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own mood entries
CREATE POLICY "Users can update own mood entries"
  ON mood_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own mood entries
CREATE POLICY "Users can delete own mood entries"
  ON mood_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_mood_entries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS mood_entries_updated_at ON mood_entries;
CREATE TRIGGER mood_entries_updated_at
  BEFORE UPDATE ON mood_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_mood_entries_updated_at();
