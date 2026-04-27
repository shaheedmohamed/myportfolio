import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin } from 'lucide-react'
import CodeSymbols3D from './CodeSymbols3D'
import TypingTerminal from './TypingTerminal'
import { buildWhatsAppUrl, WhatsAppIcon } from '../lib/whatsapp'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    const isMobile = window.innerWidth < 768
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    let resizeT
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize)

    const particleCount = isMobile ? 25 : 50
    const particles = []
    const W = window.innerWidth
    const H = window.innerHeight
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.6 + 0.5,
        color: Math.random() > 0.5 ? '139,92,246' : '6,182,212',
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    let frame = 0
    let raf
    const linkDist = isMobile ? 0 : 110

    function animate() {
      frame++
      // On mobile, run at ~30fps. Skip every other frame.
      if (isMobile && frame % 2 === 0) {
        raf = requestAnimationFrame(animate)
        return
      }
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        else if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        else if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()

        if (linkDist > 0) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const ddx = p.x - p2.x
            if (ddx > linkDist || ddx < -linkDist) continue
            const ddy = p.y - p2.y
            if (ddy > linkDist || ddy < -linkDist) continue
            const d = Math.sqrt(ddx * ddx + ddy * ddy)
            if (d < linkDist) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(139,92,246,${0.05 * (1 - d / linkDist)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

const letterVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.8 + i * 0.05,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const firstName = 'Shaheed'
  const lastName = 'Mohamed'
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    if (window.innerWidth < 768) return // skip on mobile
    let pending = false
    let mx = 0.5, my = 0.5
    const handle = (e) => {
      mx = e.clientX / window.innerWidth
      my = e.clientY / window.innerHeight
      if (!pending) {
        pending = true
        requestAnimationFrame(() => {
          const x = (mx - 0.5) * 12
          const y = (my - 0.5) * -8
          el.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg)`
          pending = false
        })
      }
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #0a0a18 50%, #06060b 100%)' }}
    >
      <ParticleCanvas />
      <CodeSymbols3D />

      {/* Radial glow orbs - static, CSS animated */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: 'min(60vw, 600px)',
            height: 'min(60vw, 600px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            animation: 'orbDrift 14s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: 'min(50vw, 500px)',
            height: 'min(50vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
            animation: 'orbDrift2 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>
      <style>{`
        @keyframes orbDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(30px, -20px, 0) scale(1.15); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
          50% { transform: translate3d(-20px, 20px, 0) scale(1); }
        }
      `}</style>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060b] to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 hero-content">
        {/* Pre-title */}
        <motion.div
          className="hero-pretitle"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500/60" />
          <span className="text-xs tracking-[0.3em] uppercase text-purple-400/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Creative Developer
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/60" />
        </motion.div>

        {/* Name */}
        <h1 ref={nameRef} className="font-bold tracking-tight hero-title" style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 0.95, fontSize: 'clamp(40px, 11vw, 140px)', transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}>
          <span className="block overflow-hidden">
            {firstName.split('').map((char, i) => (
              <motion.span
                key={`f-${i}`}
                className="inline-block text-white"
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden" style={{ marginTop: 8 }}>
            {lastName.split('').map((char, i) => (
              <motion.span
                key={`l-${i}`}
                className="inline-block text-gradient"
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={i + firstName.length}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          className="hero-tagline text-base sm:text-lg md:text-xl"
          style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '24px auto 0', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting immersive digital experiences where{' '}
          <span className="text-purple-400">design meets engineering</span>.
          Turning bold ideas into pixel-perfect reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-cta"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="group relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', fontFamily: "'Space Grotesk', sans-serif", padding: '16px 36px', borderRadius: 999, fontSize: 14, letterSpacing: '0.08em', color: '#fff', minHeight: 52, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(139,92,246,0.45)' }}
            whileTap={{ scale: 0.96 }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.a>

          <motion.a
            href={buildWhatsAppUrl('Hi Shaheed! I came from your portfolio and would love to chat.')}
            target="_blank"
            rel="noopener noreferrer"
            className="glass hover:bg-white/10 transition-all duration-300"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Space Grotesk', sans-serif", padding: '16px 36px', borderRadius: 999, fontSize: 14, letterSpacing: '0.08em', minHeight: 52, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
            whileHover={{ scale: 1.04, color: '#fff' }}
            whileTap={{ scale: 0.96 }}
          >
            <WhatsAppIcon size={16} /> Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="hero-social"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          {[
            { icon: Github, href: 'https://github.com/shaheedmohamed', hoverColor: '#a78bfa' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/shaheedmohamed', hoverColor: '#a78bfa' },
            { icon: WhatsAppIcon, href: buildWhatsAppUrl('Hi Shaheed! I came from your portfolio.'), hoverColor: '#22c55e' },
          ].map(({ icon: Icon, href, hoverColor }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="contact link"
              className="rounded-full glass transition-all duration-300"
              style={{ color: 'rgba(255,255,255,0.4)', padding: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              whileHover={{ scale: 1.2, y: -3, color: hoverColor }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk', sans-serif" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={14} style={{ color: 'rgba(255,255,255,0.25)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
