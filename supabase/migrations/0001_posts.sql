-- Create posts table for Hyper Chirp
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  author_name text NOT NULL,
  author_avatar text,
  content text NOT NULL,
  tag text,
  likes int NOT NULL DEFAULT 0,
  sentiment text CHECK (sentiment IN ('Positiv', 'Negativ', 'Neutral', 'Kaotisk')),
  is_anonymous boolean NOT NULL DEFAULT false,
  CONSTRAINT content_length CHECK (char_length(trim(content)) > 0 AND char_length(content) <= 280)
);

-- Create indexes for better query performance
CREATE INDEX idx_posts_created_at ON posts (created_at DESC);
CREATE INDEX idx_posts_tag ON posts (tag) WHERE tag IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) to select all posts
CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  USING (true);

-- Allow public (anon) to insert posts
CREATE POLICY "Anyone can create posts"
  ON posts
  FOR INSERT
  WITH CHECK (true);

-- Allow public (anon) to update posts (for likes)
CREATE POLICY "Anyone can update posts"
  ON posts
  FOR UPDATE
  USING (true);

-- Create atomic like increment function
CREATE OR REPLACE FUNCTION increment_likes(post_id uuid)
RETURNS posts
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_post posts;
BEGIN
  UPDATE posts
  SET likes = likes + 1
  WHERE id = post_id
  RETURNING * INTO updated_post;
  
  IF updated_post IS NULL THEN
    RAISE EXCEPTION 'Post not found';
  END IF;
  
  RETURN updated_post;
END;
$$;

-- Grant execute permission to anon role
GRANT EXECUTE ON FUNCTION increment_likes(uuid) TO anon;
GRANT EXECUTE ON FUNCTION increment_likes(uuid) TO authenticated;
