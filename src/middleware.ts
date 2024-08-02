import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { isValidSession } from './session';

export const config = {
  matcher: '/',
};

export async function middleware(request: NextRequest) {
	const cookie = request.cookies.get('session');

	if (cookie === undefined || !(await isValidSession(cookie.value))) {
		return new Response('Not Found', { status: 404 });
	}
}
