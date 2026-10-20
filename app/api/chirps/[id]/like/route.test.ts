import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/chirps/[id]/like/route';
import { NextRequest } from 'next/server';

// Mock Supabase client
vi.mock('@/lib/supabase', () => ({
  getSupabaseClient: vi.fn(() => ({
    rpc: vi.fn(),
  })),
}));

describe('POST /api/chirps/[id]/like', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 for invalid UUID', async () => {
    const request = new NextRequest('http://localhost:3000/api/chirps/invalid-id/like', {
      method: 'POST',
    });

    const params = Promise.resolve({ id: 'invalid-id' });
    const response = await POST(request, { params });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid post ID (must be a UUID)');
  });

  it('should return 404 when post not found (RPC error with "Post not found")', async () => {
    const { getSupabaseClient } = await import('@/lib/supabase');
    const mockRpc = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Post not found', code: 'P0001' },
    });

    vi.mocked(getSupabaseClient).mockReturnValue({
      rpc: mockRpc,
    } as ReturnType<typeof getSupabaseClient>);

    const request = new NextRequest('http://localhost:3000/api/chirps/123e4567-e89b-12d3-a456-426614174000/like', {
      method: 'POST',
    });

    const params = Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' });
    const response = await POST(request, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Chirp not found');
    expect(mockRpc).toHaveBeenCalledWith('increment_likes', {
      post_id: '123e4567-e89b-12d3-a456-426614174000',
    });
  });

  it('should return 200 with updated post on success', async () => {
    const { getSupabaseClient } = await import('@/lib/supabase');
    const mockPost = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      created_at: '2026-10-17T10:30:00Z',
      author_name: 'Test User',
      author_avatar: null,
      content: 'Test chirp',
      tag: null,
      likes: 6,
      sentiment: null,
      is_anonymous: false,
    };

    const mockRpc = vi.fn().mockResolvedValue({
      data: mockPost,
      error: null,
    });

    vi.mocked(getSupabaseClient).mockReturnValue({
      rpc: mockRpc,
    } as ReturnType<typeof getSupabaseClient>);

    const request = new NextRequest('http://localhost:3000/api/chirps/123e4567-e89b-12d3-a456-426614174000/like', {
      method: 'POST',
    });

    const params = Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' });
    const response = await POST(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockPost);
    expect(data.likes).toBe(6);
  });

  it('should return 500 for other RPC errors', async () => {
    const { getSupabaseClient } = await import('@/lib/supabase');
    const mockRpc = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Database connection failed', code: '08000' },
    });

    vi.mocked(getSupabaseClient).mockReturnValue({
      rpc: mockRpc,
    } as ReturnType<typeof getSupabaseClient>);

    const request = new NextRequest('http://localhost:3000/api/chirps/123e4567-e89b-12d3-a456-426614174000/like', {
      method: 'POST',
    });

    const params = Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' });
    const response = await POST(request, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Could not update likes');
  });
});
