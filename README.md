# Hyper Chirp API

A Twitter-like REST API built with Next.js and Supabase for Hyper Island students to use in their class projects.

## Features

- 📝 Create chirps (max 280 characters)
- ❤️ Like chirps (atomic counter)
- 🔍 Search and filter by tag
- 😊 Sentiment tagging (Positive, Negative, Neutral, Chaotic)
- 🎭 Anonymous chirps with funny aliases
- 🌐 CORS-enabled for cross-origin requests
- 🏥 Health check endpoint

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** Supabase (PostgreSQL with REST API)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel-ready

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL from `supabase/migrations/0001_posts.sql`
4. Run the SQL from `supabase/migrations/0002_increment_likes_invoker.sql`
5. (Optional) Run `supabase/migrations/seed.sql` for test data

### 2. Configure environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase Dashboard under Settings → API.

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the API documentation.

## API Endpoints

### GET /api/chirps

Fetch chirps, sorted by newest first.

**Query parameters:**
- `tag` - Filter by exact tag
- `limit` - Number of chirps (1-100, default 50)
- `search` - Search in content (case-insensitive)

**Example:**
```javascript
fetch('/api/chirps?tag=nextjs&limit=20')
  .then(res => res.json())
  .then(data => console.log(data));
```

### POST /api/chirps

Create a new chirp.

**Request body:**
```json
{
  "author_name": "Anna Svensson",
  "content": "My first chirp!",
  "author_avatar": "https://example.com/avatar.jpg",
  "tag": "nextjs",
  "sentiment": "Positive",
  "is_anonymous": false
}
```

**Required fields:**
- `author_name` (string, non-empty)
- `content` (string, 1-280 characters)

**Optional fields:**
- `author_avatar` (string)
- `tag` (string)
- `sentiment` ("Positive" | "Negative" | "Neutral" | "Chaotic")
- `is_anonymous` (boolean) - If true, replaces author_name with a funny alias

### POST /api/chirps/[id]/like

Like a chirp (atomic +1).

**Example:**
```javascript
fetch('/api/chirps/123e4567-e89b-12d3-a456-426614174000/like', {
  method: 'POST'
}).then(res => res.json());
```

### GET /api/health

Check if the API and Supabase are available.

**Response:**
```json
{
  "ok": true,
  "supabase": "reachable",
  "latencyMs": 45
}
```

## Database Schema

```sql
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  author_name text NOT NULL,
  author_avatar text,
  content text NOT NULL,
  tag text,
  likes int NOT NULL DEFAULT 0,
  sentiment text CHECK (sentiment IN ('Positive', 'Negative', 'Neutral', 'Chaotic')),
  is_anonymous boolean NOT NULL DEFAULT false,
  CONSTRAINT content_length CHECK (char_length(trim(content)) > 0 AND char_length(content) <= 280)
);

CREATE INDEX idx_posts_created_at ON posts (created_at DESC);
CREATE INDEX idx_posts_tag ON posts (tag) WHERE tag IS NOT NULL;
```

## Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Testing

Run tests:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

Build the project:
```bash
npm run build
```

## Error Messages

The API returns friendly error messages in English:

```json
{
  "error": "content can be at most 280 characters (you sent 312)",
  "field": "content"
}
```

## Anonymous Aliases

When `is_anonymous: true` is used, a random funny alias is chosen from a list:
- The Coffee Machine on Floor 3
- VS Code
- The Broken Projector
- Someone in the Slack Channel
- Stack Overflow
- Merge Conflict
- Undefined
- ...and many more!

## License

This is an educational project for Hyper Island. Feel free to use it in your class projects!
