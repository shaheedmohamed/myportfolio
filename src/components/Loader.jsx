import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }
const monoFont = { fontFamily: "'JetBrains Mono', monospace" }

// 3D cube with code symbols on each face
function Cube3D() {
  const size = 110
  const half = size / 2
  const faces = [
    { transform: `translateZ(${half}px)`, content: 'SM', isLogo: true, color: '#a78bfa' },
    { transform: `rotateY(180deg) translateZ(${half}px)`, content: '</>', color: '#06b6d4' },
    { transform: `rotateY(90deg) translateZ(${half}px)`, content: '{ }', color: '#22d3ee' },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, content: '=>', color: '#a78bfa' },
    { transform: `rotateX(90deg) translateZ(${half}px)`, content: 'fn', color: '#7c3aed' },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, content: '0x1', color: '#06b6d4' },
  ]

  return (
    <div style={{ perspective: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: size + 60, height: size + 60 }}>
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          animation: 'cubeSpin 8s linear infinite',
          willChange: 'transform',
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: face.transform,
              fontFamily: face.isLogo ? "'Space Grotesk', sans-serif" : "'JetBrains Mono', monospace",
              fontSize: face.isLogo ? 44 : 22,
              fontWeight: 700,
              color: face.color,
              background: `linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.04))`,
              border: `1px solid ${face.color}45`,
              boxShadow: `0 0 30px ${face.color}25, inset 0 0 20px ${face.color}10`,
              borderRadius: 12,
              backdropFilter: 'blur(8px)',
            }}
          >
            {face.isLogo ? <span className="text-gradient">{face.content}</span> : face.content}
          </div>
        ))}
      </div>
    </div>
  )
}

// 3D orbital rings around the cube
function OrbitalRings() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        pointerEvents: 'none',
      }}
    >
      {/* Ring 1 — horizontal */}
      <div
        style={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          border: '1px solid rgba(139,92,246,0.25)',
          transform: 'rotateX(75deg)',
          animation: 'ringRotate1 6s linear infinite',
          willChange: 'transform',
          boxShadow: '0 0 30px rgba(139,92,246,0.15)',
        }}
      />
      {/* Ring 2 — diagonal */}
      <div
        style={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          border: '1px solid rgba(6,182,212,0.3)',
          transform: 'rotateX(60deg) rotateY(30deg)',
          animation: 'ringRotate2 8s linear infinite reverse',
          willChange: 'transform',
        }}
      />
      {/* Ring 3 — vertical */}
      <div
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: '1px solid rgba(167,139,250,0.2)',
          transform: 'rotateY(70deg)',
          animation: 'ringRotate3 10s linear infinite',
          willChange: 'transform',
        }}
      />
      {/* Glowing dot orbiting */}
      <div
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#a78bfa',
          boxShadow: '0 0 20px #a78bfa, 0 0 40px #a78bfa',
          animation: 'orbitDot 4s linear infinite',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

// Floating code symbols in 3D
function FloatingSymbols() {
  const symbols = ['{}', '<>', '=>', '()', '[]', '&&', '++', 'fn']
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        perspective: '800px',
      }}
    >
      {symbols.map((sym, i) => {
        const angle = (360 / symbols.length) * i
        const radius = 200
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transformStyle: 'preserve-3d',
              animation: `floatSymbol${i % 3} ${5 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * -0.4}s`,
              willChange: 'transform',
            }}
          >
            <span
              style={{
                position: 'absolute',
                ...monoFont,
                fontSize: 14,
                fontWeight: 600,
                color: i % 2 ? '#06b6d4' : '#a78bfa',
                opacity: 0.4,
                textShadow: `0 0 10px ${i % 2 ? '#06b6d4' : '#a78bfa'}`,
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                whiteSpace: 'nowrap',
              }}
            >
              {sym}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function Loader() {
  const { isLoading, setIsLoading } = useStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 600)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [setIsLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#06060b', overflow: 'hidden' }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 500,
              height: 500,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
              animation: 'pulseBg 3s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* 3D Logo system */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FloatingSymbols />
            <OrbitalRings />
            <Cube3D />
          </motion.div>

          {/* Progress section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ marginTop: 32, width: 240, position: 'relative', zIndex: 10 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ ...monoFont, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)' }}>
                {progress < 30 ? 'INITIALIZING' : progress < 60 ? 'COMPILING' : progress < 90 ? 'OPTIMIZING' : 'READY'}
              </span>
              <span style={{ ...monoFont, fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>
                {String(Math.min(Math.round(progress), 100)).padStart(3, '0')}%
              </span>
            </div>
            <div
              style={{
                height: 3,
                borderRadius: 999,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.06)',
                position: 'relative',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #a78bfa)',
                  backgroundSize: '200% 100%',
                  width: `${Math.min(progress, 100)}%`,
                  boxShadow: '0 0 12px rgba(139,92,246,0.6)',
                  animation: 'shimmerBar 2s linear infinite',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Code-like status line */}
            <div
              style={{
                ...monoFont,
                marginTop: 14,
                fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              <span style={{ color: '#10b981' }}>✓</span> compiling modules...{' '}
              <span style={{ color: '#a78bfa' }}>{Math.min(Math.round(progress * 1.4), 142)}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/142</span>
            </div>
          </motion.div>

          <style>{`
            @keyframes cubeSpin {
              0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
              100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg); }
            }
            @keyframes ringRotate1 {
              0% { transform: rotateX(75deg) rotateZ(0deg); }
              100% { transform: rotateX(75deg) rotateZ(360deg); }
            }
            @keyframes ringRotate2 {
              0% { transform: rotateX(60deg) rotateY(30deg) rotateZ(0deg); }
              100% { transform: rotateX(60deg) rotateY(30deg) rotateZ(360deg); }
            }
            @keyframes ringRotate3 {
              0% { transform: rotateY(70deg) rotateZ(0deg); }
              100% { transform: rotateY(70deg) rotateZ(360deg); }
            }
            @keyframes orbitDot {
              0% { transform: rotateZ(0deg) translateX(140px) rotateZ(0deg); }
              100% { transform: rotateZ(360deg) translateX(140px) rotateZ(-360deg); }
            }
            @keyframes pulseBg {
              0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
            }
            @keyframes shimmerBar {
              0% { background-position: 0% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes floatSymbol0 {
              0%, 100% { transform: translate(-50%, -50%) rotateY(0deg); }
              50% { transform: translate(-50%, -50%) rotateY(180deg); }
            }
            @keyframes floatSymbol1 {
              0%, 100% { transform: translate(-50%, -50%) rotateZ(0deg) rotateX(0deg); }
              50% { transform: translate(-50%, -50%) rotateZ(180deg) rotateX(45deg); }
            }
            @keyframes floatSymbol2 {
              0%, 100% { transform: translate(-50%, -50%) rotateY(0deg) rotateZ(0deg); }
              50% { transform: translate(-50%, -50%) rotateY(-180deg) rotateZ(45deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
