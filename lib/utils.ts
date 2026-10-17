export const ANONYMOUS_ALIASES = [
  'Kaffebryggaren på plan 3',
  'VS Code',
  'Den trasiga projektorn',
  'Någon i Slack-kanalen',
  'Den mystiska MacBooken',
  'Personen som glömde logga ut',
  'RGB-tangentbordet',
  'Sticky notes på monitorn',
  'Den övergivna kaffemuggen',
  'WiFi-routern',
  'Whiteboard-pennan',
  'Skrivaren som alltid krånglar',
  'Personen vid fönstret',
  'Någon från design-teamet',
  'JavaScript-konsolen',
  'npm install',
  'git commit --amend',
  'Merge conflict',
  'Stack Overflow',
  'ChatGPT',
  'Figma-prototypen',
  'Trello-kortet',
  'Zoom-mötet',
  'Discord-servern',
  'Notion-sidan',
];

export function getRandomAlias(): string {
  return ANONYMOUS_ALIASES[Math.floor(Math.random() * ANONYMOUS_ALIASES.length)];
}

export function validateContent(content: unknown): { valid: boolean; error?: string; value?: string } {
  if (typeof content !== 'string') {
    return { valid: false, error: 'content måste vara en text' };
  }
  
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'content får inte vara tom' };
  }
  
  if (content.length > 280) {
    return { valid: false, error: `content får max vara 280 tecken (du skickade ${content.length})` };
  }
  
  return { valid: true, value: content };
}

export function validateAuthorName(name: unknown): { valid: boolean; error?: string; value?: string } {
  if (typeof name !== 'string') {
    return { valid: false, error: 'author_name måste vara en text' };
  }
  
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'author_name får inte vara tom' };
  }
  
  return { valid: true, value: name };
}

export function validateSentiment(sentiment: unknown): { valid: boolean; error?: string; value?: 'Positiv' | 'Negativ' | 'Neutral' | 'Kaotisk' } {
  if (sentiment === undefined || sentiment === null) {
    return { valid: true, value: undefined };
  }
  
  if (typeof sentiment !== 'string') {
    return { valid: false, error: 'sentiment måste vara en text' };
  }
  
  const validSentiments = ['Positiv', 'Negativ', 'Neutral', 'Kaotisk'] as const;
  type ValidSentiment = typeof validSentiments[number];
  
  if (!(validSentiments as readonly string[]).includes(sentiment)) {
    return { valid: false, error: `sentiment måste vara en av: ${validSentiments.join(', ')}` };
  }
  
  return { valid: true, value: sentiment as ValidSentiment };
}

export function validateLimit(limit: string | null): { valid: boolean; error?: string; value?: number } {
  if (!limit) {
    return { valid: true, value: 50 };
  }
  
  const parsed = parseInt(limit, 10);
  if (isNaN(parsed)) {
    return { valid: false, error: 'limit måste vara ett nummer' };
  }
  
  if (parsed < 1 || parsed > 100) {
    return { valid: true, value: Math.max(1, Math.min(100, parsed)) };
  }
  
  return { valid: true, value: parsed };
}

export function setCorsHeaders(headers: Headers) {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
}
