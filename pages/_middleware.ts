import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.page.name === '/dashboard') {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const auth = basicAuth.split(' ')[1];
      const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

      if (
        user === process.env.AUTH_ADMIN_USERNAME &&
        pwd === process.env.AUTH_ADMIN_PASSWORD
      ) {
        return NextResponse.next();
      }
    }

    return new Response('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    child-src 'self';
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
  `;

  const response = NextResponse.next();

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
