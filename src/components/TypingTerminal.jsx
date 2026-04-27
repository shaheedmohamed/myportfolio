import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Each line is one chunk of styled text
const lines = [
  { txt: '$ whoami', c: '#fff', prompt: '#a78bfa' },
  { txt: '> shaheed.mohamed', c: '#06b6d4' },
  { txt: '', br: true },
  { txt: '$ cat skills.json', c: '#fff', prompt: '#a78bfa' },
  { txt: '{', c: '#94a3b8' },
  { txt: '  "frontend": ["React", "Next.js", "TypeScript"],', c: '#22d3ee' },
  { txt: '  "backend":  ["Node.js", "Express", "MongoDB"],', c: '#22d3ee' },
  { txt: '  "passion":  "crafting experiences"', c: '#22d3ee' },
  { txt: '}', c: '#94a3b8' },
  { txt: '', br: true },
  { txt: '$ npm run build-future', c: '#fff', prompt: '#a78bfa' },
  { txt: '✓ Compiled successfully', c: '#10b981' },
  { txt: '⚡ Ready to ship.', c: '#a78bfa' },
]

export default function TypingTerminal() {
  const cardRef = useRef(null)
  const bodyRef = useRef(null)

  // Imperative typing — directly mutates DOM, no React re-renders
  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    let cancelled = false
    let timer

    const run = async () => {
      while (!cancelled) {
        body.innerHTML = ''
        for (let i = 0; i < lines.length && !cancelled; i++) {
          const line = lines[i]
          if (line.br) {
            const sp = document.createElement('div')
            sp.style.height = '8px'
            body.appendChild(sp)
            continue
          }
          const div = document.createElement('div')
          if (line.prompt) {
            const promptText = line.txt.startsWith('$') ? '$ ' : ''
            const cmdText = line.txt.replace(/^\$\s*/, '')
            const promptSpan = document.createElement('span')
            promptSpan.style.color = line.prompt
            promptSpan.textContent = promptText
            div.appendChild(promptSpan)
            const textSpan = document.createElement('span')
            textSpan.style.color = line.c
            div.appendChild(textSpan)
            body.appendChild(div)
            for (let j = 0; j < cmdText.length && !cancelled; j++) {
              textSpan.textContent += cmdText[j]
              await new Promise((r) => { timer = setTimeout(r, 45) })
            }
            await new Promise((r) => { timer = setTimeout(r, 280) })
          } else {
            div.style.color = line.c
            body.appendChild(div)
            for (let j = 0; j < line.txt.length && !cancelled; j++) {
              div.textContent += line.txt[j]
              await new Promise((r) => { timer = setTimeout(r, 14) })
            }
            await new Promise((r) => { timer = setTimeout(r, 80) })
          }
        }
        await new Promise((r) => { timer = setTimeout(r, 3500) })
      }
    }

    run()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  // 3D tilt — only when hovering
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (window.innerWidth < 768) return // skip on mobile
    let pending = false
    let mx = 0, my = 0
    const handle = (e) => {
      const rect = card.getBoundingClientRect()
      mx = (e.clientX - rect.left) / rect.width - 0.5
      my = (e.clientY - rect.top) / rect.height - 0.5
      if (!pending) {
        pending = true
        requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateY(${mx * 10}deg) rotateX(${-my * 10}deg)`
          pending = false
        })
      }
    }
    const reset = () => {
      card.style.transform = 'perspective(1000px) rotateY(-6deg) rotateX(3deg)'
    }
    reset()
    card.addEventListener('mousemove', handle, { passive: true })
    card.addEventListener('mouseleave', reset)
    return () => {
      card.removeEventListener('mousemove', handle)
      card.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <div style={{ perspective: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 540,
          borderRadius: 14,
          overflow: 'hidden',
          background: 'rgba(10, 10, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '0 30px 80px -20px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <span style={{
            marginLeft: 'auto',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
          }}>
            ~/shaheed — zsh
          </span>
        </div>

        {/* Body — populated imperatively */}
        <div
          ref={bodyRef}
          style={{
            padding: '20px 24px 24px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            lineHeight: 1.75,
            minHeight: 300,
            textAlign: 'left',
            direction: 'ltr',
          }}
        />

        {/* Glow accent */}
        <div style={{
          position: 'absolute',
          top: -1,
          left: '20%',
          right: '20%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)',
        }} />
      </motion.div>
    </div>
  )
}
