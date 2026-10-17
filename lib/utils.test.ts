import { describe, it, expect } from 'vitest';
import {
  validateContent,
  validateAuthorName,
  validateSentiment,
  validateLimit,
  getRandomAlias,
  ANONYMOUS_ALIASES,
} from '@/lib/utils';

describe('validateContent', () => {
  it('should accept valid content', () => {
    const result = validateContent('Hello world!');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Hello world!');
  });

  it('should reject non-string content', () => {
    const result = validateContent(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('content must be a string');
  });

  it('should reject empty content', () => {
    const result = validateContent('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('content cannot be empty');
  });

  it('should reject content over 280 characters', () => {
    const longContent = 'a'.repeat(281);
    const result = validateContent(longContent);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('content can be at most 280 characters');
    expect(result.error).toContain('281');
  });

  it('should accept content exactly at 280 characters', () => {
    const content = 'a'.repeat(280);
    const result = validateContent(content);
    expect(result.valid).toBe(true);
    expect(result.value).toBe(content);
  });
});

describe('validateAuthorName', () => {
  it('should accept valid author name', () => {
    const result = validateAuthorName('Anna Svensson');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Anna Svensson');
  });

  it('should reject non-string author name', () => {
    const result = validateAuthorName(null);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('author_name must be a string');
  });

  it('should reject empty author name', () => {
    const result = validateAuthorName('  ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('author_name cannot be empty');
  });
});

describe('validateSentiment', () => {
  it('should accept valid sentiments', () => {
    const validSentiments = ['Positive', 'Negative', 'Neutral', 'Chaotic'];
    validSentiments.forEach(sentiment => {
      const result = validateSentiment(sentiment);
      expect(result.valid).toBe(true);
      expect(result.value).toBe(sentiment);
    });
  });

  it('should accept null/undefined sentiment', () => {
    expect(validateSentiment(null).valid).toBe(true);
    expect(validateSentiment(undefined).valid).toBe(true);
  });

  it('should reject invalid sentiment', () => {
    const result = validateSentiment('Happy');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('sentiment must be one of');
  });

  it('should reject non-string sentiment', () => {
    const result = validateSentiment(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('sentiment must be a string');
  });
});

describe('validateLimit', () => {
  it('should default to 50 when no limit provided', () => {
    const result = validateLimit(null);
    expect(result.valid).toBe(true);
    expect(result.value).toBe(50);
  });

  it('should accept valid limit', () => {
    const result = validateLimit('25');
    expect(result.valid).toBe(true);
    expect(result.value).toBe(25);
  });

  it('should clamp limit below 1', () => {
    const result = validateLimit('0');
    expect(result.valid).toBe(true);
    expect(result.value).toBe(1);
  });

  it('should clamp limit above 100', () => {
    const result = validateLimit('150');
    expect(result.valid).toBe(true);
    expect(result.value).toBe(100);
  });

  it('should reject non-numeric limit', () => {
    const result = validateLimit('abc');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('limit must be a number');
  });
});

describe('getRandomAlias', () => {
  it('should return an alias from the list', () => {
    const alias = getRandomAlias();
    expect(ANONYMOUS_ALIASES).toContain(alias);
  });

  it('should return different aliases on multiple calls (eventually)', () => {
    const aliases = new Set<string>();
    for (let i = 0; i < 100; i++) {
      aliases.add(getRandomAlias());
    }
    expect(aliases.size).toBeGreaterThan(1);
  });

  it('should never return undefined', () => {
    for (let i = 0; i < 50; i++) {
      const alias = getRandomAlias();
      expect(alias).toBeDefined();
      expect(typeof alias).toBe('string');
      expect(alias.length).toBeGreaterThan(0);
    }
  });
});

describe('ANONYMOUS_ALIASES', () => {
  it('should have at least 20 aliases', () => {
    expect(ANONYMOUS_ALIASES.length).toBeGreaterThanOrEqual(20);
  });

  it('should have unique aliases', () => {
    const uniqueAliases = new Set(ANONYMOUS_ALIASES);
    expect(uniqueAliases.size).toBe(ANONYMOUS_ALIASES.length);
  });

  it('should have non-empty string aliases', () => {
    ANONYMOUS_ALIASES.forEach(alias => {
      expect(typeof alias).toBe('string');
      expect(alias.length).toBeGreaterThan(0);
    });
  });
});
