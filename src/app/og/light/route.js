import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        color: 'black',
        fontSize: 64,
        fontWeight: 700
      }}>
        Portfolio — Light
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
