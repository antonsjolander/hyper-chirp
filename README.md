# Hyper Chirp API

Ett Twitter-liknande REST API byggt med Next.js och Supabase för Hyper Island-studenter att använda i sina klassprojekt.

## Funktioner

- 📝 Skapa chirps (max 280 tecken)
- ❤️ Gilla chirps (atomisk räknare)
- 🔍 Sök och filtrera efter tag
- 😊 Sentiment-tagging (Positiv, Negativ, Neutral, Kaotisk)
- 🎭 Anonyma chirps med roliga alias
- 🌐 CORS-aktiverat för att anropas från alla frontends
- 🏥 Health check-endpoint

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** Supabase (PostgreSQL med REST API)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel-ready

## Setup

### 1. Skapa ett Supabase-projekt

1. Gå till [supabase.com](https://supabase.com) och skapa ett nytt projekt
2. Gå till SQL Editor i din Supabase-dashboard
3. Kör SQL-koden från `supabase/migrations/0001_posts.sql`
4. (Valfritt) Kör `supabase/migrations/seed.sql` för att få lite testdata

### 2. Konfigurera miljövariabler

Skapa `.env.local` i projektets rot:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

Du hittar dessa värden i Supabase Dashboard under Settings → API.

### 3. Installera och kör

\`\`\`bash
npm install
npm run dev
\`\`\`

Öppna [http://localhost:3000](http://localhost:3000) för att se API-dokumentationen.

## API Endpoints

### GET /api/chirps

Hämta chirps, sorterade efter nyast först.

**Query parameters:**
- `tag` - Filtrera på exakt tag
- `limit` - Antal chirps (1-100, default 50)
- `search` - Sök i innehållet (case-insensitive)

**Exempel:**
\`\`\`javascript
fetch('/api/chirps?tag=nextjs&limit=20')
  .then(res => res.json())
  .then(data => console.log(data));
\`\`\`

### POST /api/chirps

Skapa en ny chirp.

**Request body:**
\`\`\`json
{
  "author_name": "Anna Svensson",
  "content": "Min första chirp!",
  "author_avatar": "https://example.com/avatar.jpg",
  "tag": "nextjs",
  "sentiment": "Positiv",
  "is_anonymous": false
}
\`\`\`

**Obligatoriska fält:**
- `author_name` (string, icke-tom)
- `content` (string, 1-280 tecken)

**Valfria fält:**
- `author_avatar` (string)
- `tag` (string)
- `sentiment` ("Positiv" | "Negativ" | "Neutral" | "Kaotisk")
- `is_anonymous` (boolean) - Om true, ersätts author_name med ett roligt alias

### POST /api/chirps/[id]/like

Gilla en chirp (atomisk +1).

**Exempel:**
\`\`\`javascript
fetch('/api/chirps/123e4567-e89b-12d3-a456-426614174000/like', {
  method: 'POST'
}).then(res => res.json());
\`\`\`

### GET /api/health

Kontrollera om API:t och Supabase är tillgängliga.

**Svar:**
\`\`\`json
{
  "ok": true,
  "supabase": "reachable",
  "latencyMs": 45
}
\`\`\`

## Database Schema

\`\`\`sql
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

CREATE INDEX idx_posts_created_at ON posts (created_at DESC);
CREATE INDEX idx_posts_tag ON posts (tag) WHERE tag IS NOT NULL;
\`\`\`

## Deploy till Vercel

1. Pusha koden till GitHub
2. Importera projektet i Vercel
3. Lägg till environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Testing

Kör tests:
\`\`\`bash
npm test
\`\`\`

Kör linting:
\`\`\`bash
npm run lint
\`\`\`

Bygg projektet:
\`\`\`bash
npm run build
\`\`\`

## Felmeddelanden

API:t returnerar vänliga felmeddelanden på svenska:

\`\`\`json
{
  "error": "content får max vara 280 tecken (du skickade 312)",
  "field": "content"
}
\`\`\`

## Anonyma Alias

När `is_anonymous: true` används, väljs ett slumpmässigt roligt alias från en lista:
- Kaffebryggaren på plan 3
- VS Code
- Den trasiga projektorn
- Någon i Slack-kanalen
- Stack Overflow
- ...och många fler!

## Licens

Detta är ett utbildningsprojekt för Hyper Island. Använd fritt i dina klassprojekt!
