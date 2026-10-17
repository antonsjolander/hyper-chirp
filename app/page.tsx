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
    author_name: 'Your Name',
    content: 'My first chirp! 🎉',
    tag: 'test',
    sentiment: 'Positive'
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
      response: '200: Array of chirps | 400: Error message',
    },
    {
      method: 'POST',
      path: '/api/chirps',
      params: '—',
      body: 'author_name, content, author_avatar?, tag?, sentiment?, is_anonymous?',
      response: '201: Created chirp | 400: Validation error',
    },
    {
      method: 'POST',
      path: '/api/chirps/[id]/like',
      params: '—',
      body: '—',
      response: '200: Updated chirp | 404: Chirp not found',
    },
    {
      method: 'GET',
      path: '/api/health',
      params: '—',
      body: '—',
      response: '200: Status and latency',
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
            A Twitter-like API for Hyper Island students to build class projects with. Send chirps, like posts, and monitor status in real time.
          </p>
          <StatusBadge />
        </header>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Quick Start</h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-[17px] mb-3 font-medium">Fetch chirps</p>
              <div className="bg-[#d3cec6] p-5 rounded relative">
                <pre className="text-[14px] overflow-x-auto mb-3 notranslate" translate="no">
                  <code>{examples.getChirps}</code>
                </pre>
                <CopyButton text={examples.getChirps} />
              </div>
            </div>

            <div>
              <p className="text-[17px] mb-3 font-medium">Create a chirp</p>
              <div className="bg-[#d3cec6] p-5 rounded relative">
                <pre className="text-[14px] overflow-x-auto mb-3 notranslate" translate="no">
                  <code>{examples.postChirp}</code>
                </pre>
                <CopyButton text={examples.postChirp} />
              </div>
            </div>

            <div>
              <p className="text-[17px] mb-3 font-medium">Like a chirp</p>
              <div className="bg-[#d3cec6] p-5 rounded relative">
                <pre className="text-[14px] overflow-x-auto mb-3 notranslate" translate="no">
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
                  <span className="text-[15px] font-semibold px-2 py-1 bg-[#256f82] text-white rounded text-[13px] notranslate" translate="no">
                    {endpoint.method}
                  </span>
                  <code className="text-[15px] font-medium notranslate" translate="no">{endpoint.path}</code>
                </div>
                <dl className="text-[15px] space-y-2 text-[#5c5852]">
                  <div className="flex gap-2">
                    <dt className="font-medium min-w-[90px]">Query params:</dt>
                    <dd className="notranslate" translate="no">{endpoint.params}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium min-w-[90px]">Body:</dt>
                    <dd className="notranslate" translate="no">{endpoint.body}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium min-w-[90px]">Response:</dt>
                    <dd>{endpoint.response}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Example Responses</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-[15px] text-[#5c5852] mb-3">Success response <span className="notranslate" translate="no">(201 Created)</span></p>
              <pre className="bg-[#d3cec6] p-5 rounded text-[14px] overflow-x-auto notranslate" translate="no">
                <code>{JSON.stringify({
                  id: '123e4567-e89b-12d3-a456-426614174000',
                  created_at: '2026-10-17T10:30:00Z',
                  author_name: 'Anna Svensson',
                  author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
                  content: 'My first chirp! 🎉',
                  tag: 'test',
                  likes: 0,
                  sentiment: 'Positive',
                  is_anonymous: false,
                }, null, 2)}</code>
              </pre>
            </div>

            <div>
              <p className="text-[15px] text-[#5c5852] mb-3">Error response <span className="notranslate" translate="no">(400 Bad Request)</span></p>
              <pre className="bg-[#d3cec6] p-5 rounded text-[14px] overflow-x-auto notranslate" translate="no">
                <code>{JSON.stringify({
                  error: 'content can be at most 280 characters (you sent 312)',
                  field: 'content',
                }, null, 2)}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[28px] font-medium mb-8">Sentiment Values</h2>
          <ul className="text-[17px] leading-relaxed space-y-2 text-[#5c5852]">
            <li><strong className="text-[#0a0a0a] notranslate" translate="no">Positive</strong> — Joy, enthusiasm</li>
            <li><strong className="text-[#0a0a0a] notranslate" translate="no">Negative</strong> — Frustration, dissatisfaction</li>
            <li><strong className="text-[#0a0a0a] notranslate" translate="no">Neutral</strong> — Factual, informative</li>
            <li><strong className="text-[#0a0a0a] notranslate" translate="no">Chaotic</strong> — Deadline panic, complete chaos</li>
          </ul>
        </section>

        <section className="my-32 text-center">
          <p className="text-[20px] leading-relaxed max-w-[34ch] mx-auto mb-6">
            Build something cool with Hyper Chirp and share it with the class.
          </p>
          <a
            href="https://github.com"
            className="inline-block px-5 py-2.5 bg-[#256f82] text-white rounded hover:bg-[#1e5a6b] transition-colors text-[16px]"
          >
            View source code
          </a>
        </section>

        <footer className="pt-12 border-t border-[#d3cec6] text-[14px] text-[#5c5852]">
          <p>Hyper Chirp API — A class project for Hyper Island</p>
        </footer>
      </div>
    </div>
  );
}
