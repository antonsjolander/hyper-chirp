import StatusBadge from './components/StatusBadge';
import CopyButton from './components/CopyButton';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyper-chirp.vercel.app';

  const examples = {
    getChirps: `fetch('${baseUrl}/api/chirps?limit=10')
  .then(res => res.json())
  .then(data => console.log(data));`,
    postChirp: `fetch('${baseUrl}/api/chirps', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    author_name: 'Ditt Namn',
    content: 'Min första chirp! 🎉',
    tag: 'test',
    sentiment: 'Positiv'
  })
}).then(res => res.json());`,
    likeChirp: `fetch('${baseUrl}/api/chirps/{id}/like', {
  method: 'POST'
}).then(res => res.json());`,
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/chirps',
      params: 'tag, limit (1-100), search',
      body: '—',
      response: '200: Array av chirps | 400: Felmeddelande',
    },
    {
      method: 'POST',
      path: '/api/chirps',
      params: '—',
      body: 'author_name, content, author_avatar?, tag?, sentiment?, is_anonymous?',
      response: '201: Skapad chirp | 400: Valideringsfel',
    },
    {
      method: 'POST',
      path: '/api/chirps/[id]/like',
      params: '—',
      body: '—',
      response: '200: Uppdaterad chirp | 404: Chirp hittades ej',
    },
    {
      method: 'GET',
      path: '/api/health',
      params: '—',
      body: '—',
      response: '200: Status och latens',
    },
  ];

  return (
    <div className="min-h-screen bg-[#dedad3] text-[#0a0a0a]">
      <div className="max-w-[560px] mx-auto px-5 py-16 md:py-24">
        <header className="mb-20">
          <h1 className="text-[26px] md:text-[32px] font-medium mb-4 leading-tight tracking-tight">
            Hyper Chirp API
          </h1>
          <p className="text-[17px] leading-relaxed text-[#5c5852] mb-6 max-w-[44ch]">
            Ett Twitter-liknande API för Hyper Island-studenter att bygga klassprojekt med. Skicka chirps, gilla inlägg och håll koll på status i realtid.
          </p>
          <StatusBadge />
        </header>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Kom igång</h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-[17px] mb-3 font-medium">Hämta chirps</p>
              <div className="bg-[#d3cec6] p-5 rounded relative">
                <pre className="text-[14px] overflow-x-auto mb-3">
                  <code>{examples.getChirps}</code>
                </pre>
                <CopyButton text={examples.getChirps} />
              </div>
            </div>

            <div>
              <p className="text-[17px] mb-3 font-medium">Skapa en chirp</p>
              <div className="bg-[#d3cec6] p-5 rounded relative">
                <pre className="text-[14px] overflow-x-auto mb-3">
                  <code>{examples.postChirp}</code>
                </pre>
                <CopyButton text={examples.postChirp} />
              </div>
            </div>

            <div>
              <p className="text-[17px] mb-3 font-medium">Gilla en chirp</p>
              <div className="bg-[#d3cec6] p-5 rounded relative">
                <pre className="text-[14px] overflow-x-auto mb-3">
                  <code>{examples.likeChirp}</code>
                </pre>
                <CopyButton text={examples.likeChirp} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Endpoints</h2>
          
          <div className="space-y-6" data-ui>
            {endpoints.map((endpoint, i) => (
              <div key={i} className="bg-[#d3cec6] p-5 rounded">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[15px] font-semibold px-2 py-1 bg-[#256f82] text-white rounded text-[13px]">
                    {endpoint.method}
                  </span>
                  <code className="text-[15px] font-medium">{endpoint.path}</code>
                </div>
                <dl className="text-[15px] space-y-2 text-[#5c5852]">
                  <div className="flex gap-2">
                    <dt className="font-medium min-w-[90px]">Parametrar:</dt>
                    <dd>{endpoint.params}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium min-w-[90px]">Body:</dt>
                    <dd>{endpoint.body}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium min-w-[90px]">Svar:</dt>
                    <dd>{endpoint.response}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Exempel på svar</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-[15px] text-[#5c5852] mb-3">Framgångsrikt svar (201 Created)</p>
              <pre className="bg-[#d3cec6] p-5 rounded text-[14px] overflow-x-auto">
                <code>{JSON.stringify({
                  id: '123e4567-e89b-12d3-a456-426614174000',
                  created_at: '2026-10-17T10:30:00Z',
                  author_name: 'Anna Svensson',
                  author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
                  content: 'Min första chirp! 🎉',
                  tag: 'test',
                  likes: 0,
                  sentiment: 'Positiv',
                  is_anonymous: false,
                }, null, 2)}</code>
              </pre>
            </div>

            <div>
              <p className="text-[15px] text-[#5c5852] mb-3">Felmeddelande (400 Bad Request)</p>
              <pre className="bg-[#d3cec6] p-5 rounded text-[14px] overflow-x-auto">
                <code>{JSON.stringify({
                  error: 'content får max vara 280 tecken (du skickade 312)',
                  field: 'content',
                }, null, 2)}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Sentiment-värden</h2>
          <ul className="text-[17px] leading-relaxed space-y-2 text-[#5c5852]">
            <li><strong className="text-[#0a0a0a]">Positiv</strong> — Glädje, entusiasm</li>
            <li><strong className="text-[#0a0a0a]">Negativ</strong> — Frustration, missnöje</li>
            <li><strong className="text-[#0a0a0a]">Neutral</strong> — Saklig, informativ</li>
            <li><strong className="text-[#0a0a0a]">Kaotisk</strong> — Deadline-panik, full förvirring</li>
          </ul>
        </section>

        <section className="my-32 text-center">
          <p className="text-[20px] leading-relaxed max-w-[34ch] mx-auto mb-6">
            Bygg något coolt med Hyper Chirp och dela det med klassen.
          </p>
          <a
            href="https://github.com"
            className="inline-block px-5 py-2.5 bg-[#256f82] text-white rounded hover:bg-[#1e5a6b] transition-colors text-[16px]"
          >
            Se källkoden
          </a>
        </section>

        <footer className="pt-12 border-t border-[#d3cec6] text-[14px] text-[#5c5852]">
          <p>Hyper Chirp API — Ett klassprojekt för Hyper Island</p>
        </footer>
      </div>
    </div>
  );
}
