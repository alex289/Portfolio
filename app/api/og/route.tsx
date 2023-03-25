/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : '';

    const hasHeaderInformation = searchParams.has('header');
    const header = hasHeaderInformation
      ? searchParams.get('header')?.slice(0, 100)
      : '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#222222',
            color: '#eaeaea',
            fontSize: 35,
            display: 'flex',
            flexDirection: 'column',
          }}>
          {hasHeaderInformation && (
            <div
              style={{
                paddingTop: '2em',
                paddingLeft: '2em',
              }}>
              {header}
            </div>
          )}

          <div
            style={{
              marginTop: '2.5em',
              marginBottom: 'auto',
              fontSize: 100,
              paddingLeft: '1em',
              paddingRight: '1em',
              color: '#818cf8',
              fontWeight: 800,
            }}>
            {title}
          </div>

          <div
            style={{
              marginBottom: '2em',
              marginLeft: '2em',
              display: 'flex',
              alignItems: 'center',
            }}>
            Alexander Konietzko
            <img
              src="https://alexanderkonietzko.vercel.app/static/images/konietzko_alexander.png"
              alt="Alexander Konietzko"
              style={{
                width: '3em',
                marginLeft: 'auto',
                marginRight: '2em',
              }}></img>
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}