import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { X, ExternalLink, Github, Target, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  if (!project) return null

  const cs = project.caseStudy || {}
  const langColor = project.langColor || '#8b5cf6'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
        style={{ background: 'rgba(6,6,11,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-t-3xl md:rounded-3xl glass-strong overflow-hidden"
          style={{
            width: '100%',
            maxWidth: 920,
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: `0 -20px 60px ${langColor}25, 0 20px 60px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full glass hover:bg-white/15 transition-colors"
            style={{ padding: 10, color: 'rgba(255,255,255,0.7)' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Hero header */}
          <div
            style={{
              position: 'relative',
              padding: '48px 32px 32px',
              background: `linear-gradient(135deg, ${langColor}20 0%, transparent 60%)`,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 999,
                background: `${langColor}15`,
                border: `1px solid ${langColor}30`,
                marginBottom: 16,
              }}
            >
              <span
                style={{ width: 6, height: 6, borderRadius: '50%', background: langColor }}
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ ...displayFont, color: langColor }}
              >
                Case Study
              </span>
            </div>
            <h2
              className="text-white font-bold"
              style={{ ...displayFont, fontSize: 'clamp(24px, 4vw, 40px)', lineHeight: 1.15, marginBottom: 12 }}
            >
              {project.name}
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 720,
              }}
            >
              {cs.tagline || project.description || 'A deep look into the problem, the approach, and the outcome.'}
            </p>

            {/* Quick links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {project.html_url && (
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all text-xs tracking-wider"
                  style={{ ...displayFont, color: 'rgba(255,255,255,0.7)' }}
                >
                  <Github size={13} /> Source
                </a>
              )}
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider transition-all"
                  style={{
                    ...displayFont,
                    background: `linear-gradient(135deg, ${langColor}, ${langColor}aa)`,
                    color: '#fff',
                  }}
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Stats row */}
            {cs.stats && cs.stats.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: 1,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                {cs.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: '#0a0a14',
                      padding: 20,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      className="text-2xl font-bold text-gradient"
                      style={displayFont}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] tracking-[0.15em] uppercase mt-1"
                      style={{ ...displayFont, color: 'rgba(255,255,255,0.4)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Problem / Solution / Result */}
            <Section
              icon={Target}
              color="#ef4444"
              label="Problem"
              title={cs.problem?.title || 'The challenge'}
              body={
                cs.problem?.body ||
                'Clients needed a fast, modern, and elegant digital presence that converts visitors into leads — without the bloat of typical CMS templates.'
              }
            />
            <Section
              icon={Lightbulb}
              color="#f59e0b"
              label="Solution"
              title={cs.solution?.title || 'The approach'}
              body={
                cs.solution?.body ||
                'A custom React + Vite stack with Framer Motion animations, optimized rendering, and a tailored design system. Built to load fast, look stunning, and stay easy to extend.'
              }
            />
            <Section
              icon={TrendingUp}
              color="#22c55e"
              label="Result"
              title={cs.result?.title || 'The outcome'}
              body={
                cs.result?.body ||
                'Shipped on schedule with measurable impact: improved engagement, lower bounce rate, and a foundation for future growth. Client returned for follow-up work.'
              }
            />

            {/* Tech stack */}
            {(project.topics?.length > 0 || cs.stack) && (
              <div>
                <div
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}
                >
                  Tech Stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(cs.stack || project.topics).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs tracking-wider rounded-full"
                      style={{
                        ...displayFont,
                        background: `${langColor}10`,
                        border: `1px solid ${langColor}25`,
                        color: `${langColor}cc`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots gallery */}
            {cs.screenshots && cs.screenshots.length > 0 && (
              <div>
                <div
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}
                >
                  Screenshots
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: 12,
                  }}
                >
                  {cs.screenshots.map((src, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        aspectRatio: '16/10',
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <img
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={buildWhatsAppUrl(`Hi Shaheed! I saw your "${project.name}" case study and I have a similar project in mind.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group inline-flex items-center justify-between rounded-2xl transition-all"
              style={{
                padding: '20px 24px',
                background: `linear-gradient(135deg, ${langColor}25, ${langColor}10)`,
                border: `1px solid ${langColor}40`,
                textDecoration: 'none',
              }}
            >
              <div>
                <div className="text-white font-semibold" style={displayFont}>
                  Have a similar project in mind?
                </div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Chat with me on WhatsApp.
                </div>
              </div>
              <div
                className="rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
                style={{
                  width: 44,
                  height: 44,
                  background: langColor,
                  color: '#fff',
                }}
              >
                <ArrowRight size={18} />
              </div>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Section({ icon: Icon, color, label, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div
        className="rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          width: 44,
          height: 44,
          background: `${color}15`,
          color,
        }}
      >
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div
          className="text-[10px] tracking-[0.2em] uppercase font-bold"
          style={{ ...displayFont, color, marginBottom: 6 }}
        >
          {label}
        </div>
        <h4
          className="text-white font-semibold mb-2"
          style={{ ...displayFont, fontSize: 18 }}
        >
          {title}
        </h4>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>
          {body}
        </p>
      </div>
    </div>
  )
}
