import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />
      <main
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #06060b 0%, #0a0a18 50%, #06060b 100%)',
          minHeight: '100vh',
          padding: '80px 20px',
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '20%',
            left: '15%',
            width: 'min(50vw, 500px)',
            height: 'min(50vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '15%',
            right: '15%',
            width: 'min(40vw, 400px)',
            height: 'min(40vw, 400px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          }}
        />

        <div
          className="relative z-10 text-center"
          style={{ maxWidth: 600, width: '100%' }}
        >
          {/* Glitch 404 */}
          <motion.div
            className="relative mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 24 }}
          >
            <h1
              className="font-bold leading-none"
              style={{
                ...displayFont,
                fontSize: 'clamp(96px, 28vw, 220px)',
                background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.04em',
                textShadow: '0 0 60px rgba(139,92,246,0.3)',
              }}
            >
              404
            </h1>

            {/* Glitch overlay layers */}
            <motion.span
              aria-hidden
              className="absolute inset-0 font-bold leading-none pointer-events-none"
              style={{
                ...displayFont,
                fontSize: 'clamp(96px, 28vw, 220px)',
                color: '#06b6d4',
                opacity: 0.18,
                mixBlendMode: 'screen',
                letterSpacing: '-0.04em',
              }}
              animate={{ x: [0, -3, 3, -2, 0], y: [0, 1, -1, 0] }}
              transition={{ duration: 0.18, repeat: Infinity, repeatDelay: 2.6, ease: 'linear' }}
            >
              404
            </motion.span>
          </motion.div>

          <motion.span
            className="text-xs tracking-[0.3em] uppercase block"
            style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', marginBottom: 12 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Lost in space
          </motion.span>

          <motion.h2
            className="font-bold text-white"
            style={{ ...displayFont, fontSize: 'clamp(22px, 5vw, 36px)', marginBottom: 12, lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            This page <span className="text-gradient">drifted away</span>
          </motion.h2>

          <motion.p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 14.5,
              lineHeight: 1.6,
              maxWidth: 480,
              margin: '0 auto 32px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The URL you tried doesn&apos;t exist on this portfolio. It may have been
            moved or never existed in the first place.
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <Link
              to="/"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                ...displayFont,
                padding: '14px 26px',
                borderRadius: 999,
                fontSize: 13,
                letterSpacing: '0.08em',
                color: '#fff',
                minHeight: 46,
                textDecoration: 'none',
              }}
            >
              <Home size={15} /> BACK HOME
            </Link>
            <Link
              to="/#projects"
              className="glass hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
              style={{
                ...displayFont,
                color: 'rgba(255,255,255,0.7)',
                padding: '14px 26px',
                borderRadius: 999,
                fontSize: 13,
                letterSpacing: '0.08em',
                minHeight: 46,
                textDecoration: 'none',
              }}
            >
              <Search size={15} /> BROWSE PROJECTS
            </Link>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs tracking-wider"
            style={{
              ...displayFont,
              color: 'rgba(255,255,255,0.35)',
              marginTop: 32,
              padding: '6px 12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
          >
            <ArrowLeft size={12} /> Go back to previous page
          </motion.button>
        </div>
      </main>
    </>
  )
}
