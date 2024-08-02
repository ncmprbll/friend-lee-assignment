import { redirect } from 'next/navigation'
import { type NextRequest  } from 'next/server';
import { cookies } from 'next/headers'

import { createSession } from '@/session';

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');

  if (key === process.env.SECRET) {
    cookies().set('session', await createSession(key));
    redirect('/');
  }

  return new Response('Unauthorized', { status: 401 });
}
