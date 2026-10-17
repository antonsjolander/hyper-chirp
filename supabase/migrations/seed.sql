-- Seed data for Hyper Chirp (optional)
INSERT INTO posts (author_name, author_avatar, content, tag, sentiment, likes) VALUES
  ('Anna Svensson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', 'Precis klarat mitt första Next.js-projekt! 🎉', 'nextjs', 'Positiv', 5),
  ('Erik Johansson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erik', 'Varför funkar inte min CSS?? Spent 3 timmar på en bugg 😤', 'css', 'Negativ', 2),
  ('Maria Berg', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', 'TypeScript är faktiskt ganska nice när man väl förstår det', 'typescript', 'Neutral', 8),
  ('Johan Lind', NULL, 'AAAHHHHH DEADLINE IMORGON OCH JAG HAR KNAPPT BÖRJAT!!!1!', NULL, 'Kaotisk', 12),
  ('Sofia Andersson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 'Tips: Använd console.log för debugging, det funkar alltid 👍', 'javascript', 'Positiv', 15);
