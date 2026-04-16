import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'SmartBlinds — Solar-Powered Autonomous Blinds'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-60px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,179,8,0.25) 0%, transparent 65%)',
            display: 'flex',
          }}
        />
        {/* Ambient glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '640px',
            gap: '12px',
            zIndex: 1,
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '4px',
            }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#eab308',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#a8a29e',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
              }}
            >
              SmartBlinds
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#fafaf9',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Blinds That Think</span>
            <span style={{ color: '#eab308' }}>for Themselves</span>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.5,
              color: '#a8a29e',
              marginTop: '8px',
            }}
          >
            Solar-powered sensors. Automatic adjustment. Zero effort.
          </p>

          {/* CTA button */}
          <div
            style={{
              display: 'flex',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#eab308',
                color: '#1c1917',
                fontSize: '18px',
                fontWeight: 700,
                padding: '14px 32px',
                borderRadius: '50px',
              }}
            >
              See How It Works
              <span style={{ fontSize: '20px' }}>→</span>
            </div>
          </div>
        </div>

        {/* Window / blinds illustration */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            height: '400px',
            borderRadius: '16px',
            border: '4px solid #44403c',
            background: 'linear-gradient(180deg, rgba(234,179,8,0.12) 0%, rgba(234,179,8,0.03) 100%)',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 60px -12px rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        >
          {/* Sun in window */}
          <div
            style={{
              position: 'absolute',
              top: '-16px',
              right: '-16px',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #eab308 25%, rgba(234,179,8,0.3) 70%)',
              display: 'flex',
            }}
          />
          {/* Slats */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '10%',
                background: i % 2 === 0 ? '#292524' : '#1c1917',
                borderBottom: '1px solid rgba(234,179,8,0.08)',
                display: 'flex',
              }}
            />
          ))}
          {/* Sensor dot */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                display: 'flex',
              }}
            />
            <span style={{ fontSize: '12px', color: '#a8a29e', fontWeight: 600 }}>
              SENSOR ACTIVE
            </span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #eab308, #ca8a04, #eab308)',
            display: 'flex',
          }}
        />

        {/* URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '80px',
            fontSize: '14px',
            color: '#57534e',
            fontWeight: 500,
            display: 'flex',
          }}
        >
          smart-blinds-zeta.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
