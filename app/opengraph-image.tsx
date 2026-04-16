import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'SmartBlinds — Autonomous Blinds Powered by Solar Intelligence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f9f7f4 0%, #eee8df 50%, #f0e8d8 100%)',
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
        {/* Sun glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            gap: '16px',
          }}
        >
          {/* Logo/brand pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#eab308',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#78716c',
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
              }}
            >
              SmartBlinds
            </span>
          </div>

          <div
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#1c1917',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Blinds That Think</span>
            <span style={{ color: '#ca8a04' }}>for Themselves</span>
          </div>

          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.5,
              color: '#78716c',
              marginTop: '8px',
            }}
          >
            Automatically adjust to sunlight using smart sensors and solar-powered logic.
          </p>
        </div>

        {/* Blinds illustration */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '320px',
            height: '420px',
            borderRadius: '16px',
            border: '6px solid #e7e5e4',
            background: 'linear-gradient(180deg, rgba(234,179,8,0.15) 0%, rgba(234,179,8,0.05) 100%)',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
          }}
        >
          {/* Sun in window */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #eab308 30%, rgba(234,179,8,0.4) 70%)',
              display: 'flex',
            }}
          />
          {/* Blind slats */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '10%',
                background: i % 2 === 0 ? '#fafaf9' : '#f5f5f4',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                transform: `perspective(200px) rotateX(${15 + Math.sin(i * 0.6) * 8}deg)`,
              }}
            />
          ))}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #eab308, #ca8a04)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
