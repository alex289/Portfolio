import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

async function logPageView(req: NextRequest) {
  if (
    process.env.NODE_ENV !== 'production' ||
    req.nextUrl.pathname.startsWith('/static') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.startsWith('/robots.txt') ||
    req.nextUrl.pathname.startsWith('/manifest.json') ||
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.ua?.isBot
  ) {
    return;
  }

  const body = JSON.stringify({
    slug: req.nextUrl.pathname,
    locale: req.nextUrl.locale,
    ua: req.ua?.ua,
    ...req.geo,
  });

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('apikey', process.env.SUPABASE_ANON_KEY as string);
  requestHeaders.set('Content-Type', 'application/json');

  const request = await fetch(`${process.env.SUPABASE_URL}/rest/v1/analytics`, {
    headers: requestHeaders,
    body,
    method: 'POST',
  });

  if (request.status !== 201) {
    console.error('Error logging analytics: ', body);
  }

  return;
}

function addSecurityHeaders(response: NextResponse) {
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com;
    child-src *.youtube.com *.google.com *.twitter.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
  `;

  response.headers.set(
    'Content-Security-Policy',
    ContentSecurityPolicy.replace(/\n/g, '')
  );
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  ev.waitUntil(
    (async () => {
      logPageView(req);
    })()
  );

  return addSecurityHeaders(NextResponse.next());
}
