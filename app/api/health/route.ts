import { NextResponse } from 'next/server';
import { checkSupabaseConnection } from '@/lib/supabase';
import { setCorsHeaders } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  const headers = new Headers();
  setCorsHeaders(headers);
  return new NextResponse(null, { status: 204, headers });
}

export async function GET() {
  const headers = new Headers();
  setCorsHeaders(headers);

  try {
    const { ok, latencyMs } = await checkSupabaseConnection();

    return NextResponse.json(
      {
        ok,
        supabase: ok ? 'reachable' : 'unreachable',
        latencyMs,
      },
      { headers }
    );
  } catch (error) {
    console.error('Error in GET /api/health:', error);
    return NextResponse.json(
      {
        ok: false,
        supabase: 'unreachable',
        latencyMs: 0,
        error: 'Kunde inte kontrollera Supabase-anslutningen',
      },
      { headers }
    );
  }
}
