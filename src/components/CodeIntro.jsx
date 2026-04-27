import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import TypingTerminal from './TypingTerminal'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

function FloatingCube() {
  const cubeRef = useRef(null)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return
    let raf
    let t = 0
    const tick = () => {
      t += 0.4
      cube.style.transform = `rotateX(${t * 0.5}deg) rotateY(${t}deg) rotateZ(${t * 0.3}deg)`
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  const faces = [
    { transform: 'translateZ(60px)', text: '<div/>', color: '#a78bfa' },
    { transform: 'rotateY(180deg) translateZ(60px)', text: '{ }', color: '#06b6d4' },
    { transform: 'rotateY(90deg) translateZ(60px)', text: '=>', color: '#22d3ee' },
    { transform: 'rotateY(-90deg) translateZ(60px)', text: '0x1', color: '#a78bfa' },
    { transform: 'rotateX(90deg) translateZ(60px)', text: 'fn()', color: '#7c3aed' },
    { transform: 'rotateX(-90deg) translateZ(60px)', text: '</>', color: '#06b6d4' },
  ]

  return (
    <div style={{ perspective: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 200 }}>
      <div
        ref={cubeRef}
        style={{
          position: 'relative',
          width: 120,
          height: 120,
          transformStyle: 'preserve-3d',
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
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 700,
              color: face.color,
              background: `linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.04))`,
              border: `1px solid ${face.color}40`,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 30px ${face.color}30, inset 0 0 20px ${face.color}15`,
              borderRadius: 8,
            }}
          >
            {face.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CodeIntro() {
  return (
    <section
      id="code-intro"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06060b 0%, #0a0a18 50%, #06060b 100%)',
        padding: '100px 24px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left: Headline + cube */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              style={{
                ...displayFont,
                color: 'rgba(167,139,250,0.5)',
                display: 'block',
                marginBottom: 16,
                fontSize: 12,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              01.5 — In My World
            </span>
            <h2
              style={{
                ...displayFont,
                color: '#fff',
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              Where <span className="text-gradient">code becomes</span> craft
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 16,
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              Every interface starts with a single line. Every product is built
              one commit at a time. This is how I think — clean code,
              thoughtful architecture, pixel-perfect execution.
            </p>

            <FloatingCube />
          </motion.div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TypingTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
