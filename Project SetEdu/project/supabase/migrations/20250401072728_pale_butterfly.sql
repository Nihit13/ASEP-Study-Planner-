/*
  # Create study sessions table

  1. New Tables
    - `study_sessions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subject` (text)
      - `date` (date)
      - `time` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `study_sessions` table
    - Add policies for users to manage their own study sessions
*/

CREATE TABLE IF NOT EXISTS study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own study sessions"
  ON study_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study sessions"
  ON study_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study sessions"
  ON study_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study sessions"
  ON study_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);