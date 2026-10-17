export const ANONYMOUS_ALIASES = [
  'The Coffee Machine on Floor 3',
  'VS Code',
  'The Broken Projector',
  'Someone in the Slack Channel',
  'The Mysterious MacBook',
  'Person Who Forgot to Log Out',
  'The RGB Keyboard',
  'Sticky Notes on the Monitor',
  'The Abandoned Coffee Mug',
  'The WiFi Router',
  'The Whiteboard Marker',
  'The Printer That Always Jams',
  'Person by the Window',
  'Someone from the Design Team',
  'The JavaScript Console',
  'npm install',
  'git commit --amend',
  'Merge Conflict',
  'Stack Overflow',
  'ChatGPT',
  'The Figma Prototype',
  'The Trello Card',
  'The Zoom Meeting',
  'The Discord Server',
  'The Notion Page',
  'Undefined',
  'NaN',
  'Console.error',
];

export function getRandomAlias(): string {
  return ANONYMOUS_ALIASES[Math.floor(Math.random() * ANONYMOUS_ALIASES.length)];
}

export function validateContent(content: unknown): { valid: boolean; error?: string; value?: string } {
  if (typeof content !== 'string') {
    return { valid: false, error: 'content must be a string' };
  }
  
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'content cannot be empty' };
  }
  
  if (content.length > 280) {
    return { valid: false, error: `content can be at most 280 characters (you sent ${content.length})` };
  }
  
  return { valid: true, value: content };
}

export function validateAuthorName(name: unknown): { valid: boolean; error?: string; value?: string } {
  if (typeof name !== 'string') {
    return { valid: false, error: 'author_name must be a string' };
  }
  
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'author_name cannot be empty' };
  }
  
  return { valid: true, value: name };
}

export function validateSentiment(sentiment: unknown): { valid: boolean; error?: string; value?: 'Positive' | 'Negative' | 'Neutral' | 'Chaotic' } {
  if (sentiment === undefined || sentiment === null) {
    return { valid: true, value: undefined };
  }
  
  if (typeof sentiment !== 'string') {
    return { valid: false, error: 'sentiment must be a string' };
  }
  
  const validSentiments = ['Positive', 'Negative', 'Neutral', 'Chaotic'] as const;
  type ValidSentiment = typeof validSentiments[number];
  
  if (!(validSentiments as readonly string[]).includes(sentiment)) {
    return { valid: false, error: `sentiment must be one of: ${validSentiments.join(', ')}` };
  }
  
  return { valid: true, value: sentiment as ValidSentiment };
}

export function validateLimit(limit: string | null): { valid: boolean; error?: string; value?: number } {
  if (!limit) {
    return { valid: true, value: 50 };
  }
  
  const parsed = parseInt(limit, 10);
  if (isNaN(parsed)) {
    return { valid: false, error: 'limit must be a number' };
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
