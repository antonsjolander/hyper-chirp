-- Seed data for Hyper Chirp (optional)
INSERT INTO posts (author_name, author_avatar, content, tag, sentiment, likes) VALUES
  ('Anna Svensson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', 'Just finished my first Next.js project! 🎉', 'nextjs', 'Positive', 5),
  ('Erik Johansson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erik', 'Why is my CSS not working?? Spent 3 hours on one bug 😤', 'css', 'Negative', 2),
  ('Maria Berg', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', 'TypeScript is actually pretty nice once you understand it', 'typescript', 'Neutral', 8),
  ('Johan Lind', NULL, 'AAAHHHHH DEADLINE TOMORROW AND I BARELY STARTED!!!1!', NULL, 'Chaotic', 12),
  ('Sofia Andersson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 'Pro tip: Use console.log for debugging, it always works 👍', 'javascript', 'Positive', 15);
