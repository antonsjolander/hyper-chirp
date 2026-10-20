CREATE OR REPLACE FUNCTION public.increment_likes(post_id uuid)
RETURNS public.posts
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  updated_post public.posts;
BEGIN
  UPDATE public.posts
  SET likes = likes + 1
  WHERE id = post_id
  RETURNING * INTO updated_post;

  IF updated_post.id IS NULL THEN
    RAISE EXCEPTION 'Post not found';
  END IF;

  RETURN updated_post;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_likes(uuid) TO anon, authenticated;
