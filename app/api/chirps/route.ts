import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, type InsertPost } from '@/lib/supabase';
import {
  validateContent,
  validateAuthorName,
  validateSentiment,
  validateLimit,
  setCorsHeaders,
  getRandomAlias,
} from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  const headers = new Headers();
  setCorsHeaders(headers);
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request: NextRequest) {
  const headers = new Headers();
  setCorsHeaders(headers);

  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');
    
    const { valid: limitValid, error: limitError, value: limit } = validateLimit(limitParam);
    if (!limitValid && limitError) {
      return NextResponse.json(
        { error: limitError },
        { status: 400, headers }
      );
    }

    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit || 50);

    if (tag) {
      query = query.eq('tag', tag);
    }

    if (search) {
      const escapedSearch = search.replace(/[%_]/g, '\\$&');
      query = query.ilike('content', `%${escapedSearch}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Could not fetch chirps from database' },
        { status: 500, headers }
      );
    }

    return NextResponse.json(data || [], { headers });
  } catch (error) {
    console.error('Error in GET /api/chirps:', error);
    const message = error instanceof Error && error.message.includes('Missing Supabase')
      ? 'Supabase är inte konfigurerad. Sätt NEXT_PUBLIC_SUPABASE_URL och NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local'
      : 'Ett oväntat fel uppstod';
    
    return NextResponse.json(
      { error: message },
      { status: 500, headers }
    );
  }
}

export async function POST(request: NextRequest) {
  const headers = new Headers();
  setCorsHeaders(headers);

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400, headers }
      );
    }

    const { author_name, content, author_avatar, tag, sentiment, is_anonymous } = body;

    const contentValidation = validateContent(content);
    if (!contentValidation.valid) {
      return NextResponse.json(
        { error: contentValidation.error, field: 'content' },
        { status: 400, headers }
      );
    }

    const authorValidation = validateAuthorName(author_name);
    if (!authorValidation.valid) {
      return NextResponse.json(
        { error: authorValidation.error, field: 'author_name' },
        { status: 400, headers }
      );
    }

    const sentimentValidation = validateSentiment(sentiment);
    if (!sentimentValidation.valid) {
      return NextResponse.json(
        { error: sentimentValidation.error, field: 'sentiment' },
        { status: 400, headers }
      );
    }

    const postData: Partial<InsertPost> = {
      author_name: is_anonymous ? getRandomAlias() : authorValidation.value,
      author_avatar: is_anonymous ? null : (author_avatar || null),
      content: contentValidation.value,
      tag: tag || null,
      sentiment: sentimentValidation.value || null,
      is_anonymous: !!is_anonymous,
    };

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Could not create chirp in database' },
        { status: 500, headers }
      );
    }

    return NextResponse.json(data, { status: 201, headers });
  } catch (error) {
    console.error('Error in POST /api/chirps:', error);
    const message = error instanceof Error && error.message.includes('Missing Supabase')
      ? 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
      : 'An unexpected error occurred';
    
    return NextResponse.json(
      { error: message },
      { status: 500, headers }
    );
  }
}
