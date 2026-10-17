import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { setCorsHeaders } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  const headers = new Headers();
  setCorsHeaders(headers);
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const headers = new Headers();
  setCorsHeaders(headers);

  try {
    const { id } = await params;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Ogiltigt post-id (måste vara ett UUID)' },
        { status: 400, headers }
      );
    }

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.rpc('increment_likes', { post_id: id });

    if (error) {
      if (error.message.includes('Post not found')) {
        return NextResponse.json(
          { error: 'Chirp hittades inte' },
          { status: 404, headers }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Kunde inte uppdatera likes' },
        { status: 500, headers }
      );
    }

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error in POST /api/chirps/[id]/like:', error);
    const message = error instanceof Error && error.message.includes('Missing Supabase')
      ? 'Supabase är inte konfigurerad. Sätt NEXT_PUBLIC_SUPABASE_URL och NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local'
      : 'Ett oväntat fel uppstod';
    
    return NextResponse.json(
      { error: message },
      { status: 500, headers }
    );
  }
}
