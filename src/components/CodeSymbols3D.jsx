import { useMemo } from 'react'

const symbols = [
  '{ }', '< />', '=>', '( )', '[ ]', '&&', '||', '!=', '==',
  '${}', '...', '//', 'fn', 'const', 'async',
  'npm', 'git', 'API', 'null', 'void',
]

const colors = ['#8b5cf6', '#06b6d4', '#a78bfa', '#22d3ee']

export default function CodeSymbols3D() {
  const items = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const list = isMobile ? symbols.slice(0, 10) : symbols
    return list.map((sym, i) => {
      const seed = i * 137
      const x = ((seed * 7) % 100)
      const y = ((seed * 13) % 100)
      const size = 14 + ((seed * 3) % 22)
      const duration = 18 + ((seed * 2) % 14)
      const delay = (seed % 10) * -1
      const color = colors[i % colors.length]
      return { sym, x, y, size, duration, delay, color, key: i }
    })
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {items.map(({ sym, x, y, size, duration, delay, color, key }) => (
        <span
          key={key}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: size,
            fontWeight: 600,
            color,
            opacity: 0.16,
            textShadow: `0 0 20px ${color}`,
            animation: `floatSym ${duration}s ${delay}s ease-in-out infinite`,
            willChange: 'transform',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {sym}
        </span>
      ))}
      <style>{`
        @keyframes floatSym {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(20px, -50px, 0); }
        }
      `}</style>
    </div>
  )
}
