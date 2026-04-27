import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState, useRef } from 'react'
import { ExternalLink, Github, Star, GitFork, Loader2, Eye } from 'lucide-react'
import GitHubStats from './GitHubStats'
import CaseStudyModal from './CaseStudyModal'

function TiltCard({ children, langColor }) {
  const ref = useRef(null)
  const glareRef = useRef(null)
  const stateRef = useRef({ x: 0.5, y: 0.5, pending: false })

  const handleMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    stateRef.current.x = (e.clientX - rect.left) / rect.width
    stateRef.current.y = (e.clientY - rect.top) / rect.height
    if (!stateRef.current.pending) {
      stateRef.current.pending = true
      requestAnimationFrame(() => {
        const { x, y } = stateRef.current
        card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) translateZ(6px)`
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, ${langColor}22, transparent 40%)`
          glareRef.current.style.opacity = '1'
        }
        stateRef.current.pending = false
      })
    }
  }
  const handleLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    >
      {children}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 16,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const fallbackProjects = [
  {
    id: 1,
    name: 'Portfolio Website',
    description: 'A next-level portfolio with animations and immersive experiences',
    html_url: 'https://github.com/shaheedmohamed',
    homepage: '',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['react', 'framer-motion'],
  },
]

const languageColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  PHP: '#777bb4',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#701516',
}

// Curated case studies — keyed by repo name (case-insensitive).
// Falls back to generic content if a repo isn't listed here.
const caseStudies = {
  default: {
    stats: [
      { label: 'Performance', value: '98' },
      { label: 'Accessibility', value: 'A+' },
      { label: 'Delivery', value: 'On Time' },
    ],
  },
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/shaheedmohamed/repos?sort=updated&per_page=12')
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) && data.length > 0 ? data : fallbackProjects))
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false))
  }, [])

  // Build dynamic filter list with counts, sorted by frequency
  const filters = useMemo(() => {
    const counts = new Map()
    projects.forEach((p) => {
      if (p.language) counts.set(p.language, (counts.get(p.language) || 0) + 1)
    })
    const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6)
    return [
      { name: 'All', count: projects.length },
      ...sorted.map(([name, count]) => ({ name, count })),
    ]
  }, [projects])

  const visibleProjects = useMemo(() => {
    const list = projects.slice(0, 9)
    if (activeFilter === 'All') return list
    return list.filter((p) => p.language === activeFilter)
  }, [projects, activeFilter])

  const openCaseStudy = (project) => {
    const langColor = languageColors[project.language] || '#8b5cf6'
    const cs = caseStudies[project.name?.toLowerCase()] || caseStudies.default
    setSelectedProject({ ...project, langColor, caseStudy: cs })
  }

  return (
    <section id="projects" className="relative overflow-hidden" style={{ background: '#06060b', padding: '120px 24px' }}>
      <div
        className="absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.span
          className="text-xs tracking-[0.3em] uppercase block"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', marginBottom: 16 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          06 — Projects
        </motion.span>
        <motion.h2
          className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 24, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Selected <span className="text-gradient">works</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, marginBottom: 48 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          A curated collection of projects showcasing my technical depth and creative problem-solving.
        </motion.p>

        {/* GitHub Stats Live Widget */}
        <GitHubStats />

        {/* Filter chips — horizontally scrollable on mobile */}
        {filters.length > 1 && (
          <motion.div
            className="projects-filter no-scrollbar"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 28,
              overflowX: 'auto',
              paddingBottom: 4,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {filters.map(({ name: filter, count }) => {
              const color = filter === 'All' ? '#8b5cf6' : languageColors[filter] || '#8b5cf6'
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="text-xs tracking-wider transition-all duration-300 inline-flex items-center gap-2"
                  style={{
                    ...displayFont,
                    padding: '8px 16px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    border: '1px solid',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    ...(isActive
                      ? {
                          background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                          borderColor: `${color}50`,
                          color: '#fff',
                          boxShadow: `0 0 20px ${color}25`,
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          borderColor: 'rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.45)',
                        }),
                  }}
                >
                  <span>{filter}</span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: '1px 7px',
                      borderRadius: 999,
                      background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                      lineHeight: 1.6,
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Loader2 size={32} style={{ color: '#8b5cf6' }} />
            </motion.div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24 }}>
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, i) => {
                const langColor = languageColors[project.language] || '#8b5cf6'
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                  >
                    <TiltCard langColor={langColor}>
                      <article
                        onClick={() => openCaseStudy(project)}
                        className="group relative rounded-2xl glass overflow-hidden cursor-pointer"
                        style={{ display: 'block' }}
                      >
                        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${langColor}, transparent)` }} />
                        <div style={{ padding: 28 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                            <h3
                              className="font-semibold text-white text-lg truncate flex-1 min-w-0 group-hover:text-purple-400 transition-colors"
                              style={displayFont}
                            >
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-2 ml-3 shrink-0">
                              <a
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-lg hover:bg-white/10 transition-all"
                                style={{ color: 'rgba(255,255,255,0.4)' }}
                                aria-label="View source"
                              >
                                <Github size={16} />
                              </a>
                              {project.homepage && (
                                <a
                                  href={project.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                                  style={{ color: 'rgba(255,255,255,0.4)' }}
                                  aria-label="View live demo"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p
                            style={{
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: 'rgba(255,255,255,0.4)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              marginBottom: 20,
                              minHeight: 44,
                            }}
                          >
                            {project.description || 'No description available'}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {project.language && (
                              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
                                {project.language}
                              </span>
                            )}
                            <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                              {project.stargazers_count > 0 && (
                                <span className="flex items-center gap-1">
                                  <Star size={12} /> {project.stargazers_count}
                                </span>
                              )}
                              {project.forks_count > 0 && (
                                <span className="flex items-center gap-1">
                                  <GitFork size={12} /> {project.forks_count}
                                </span>
                              )}
                            </div>
                          </div>
                          {project.topics?.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                              {project.topics.slice(0, 4).map((topic) => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 text-[10px] tracking-wider rounded-full"
                                  style={{ ...displayFont, color: 'rgba(167,139,250,0.6)', background: 'rgba(139,92,246,0.1)' }}
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Hover overlay: View Case Study */}
                          <div
                            className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
                            style={{
                              padding: '12px 28px',
                              background: `linear-gradient(180deg, transparent, ${langColor}25)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6,
                              fontSize: 11,
                              letterSpacing: '0.1em',
                              ...displayFont,
                              color: '#fff',
                            }}
                          >
                            <Eye size={12} /> VIEW CASE STUDY
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {visibleProjects.length === 0 && !loading && (
          <div
            style={{
              textAlign: 'center',
              padding: 60,
              color: 'rgba(255,255,255,0.4)',
              ...displayFont,
            }}
          >
            No projects in this category yet.
          </div>
        )}

        <motion.div style={{ marginTop: 64, textAlign: 'center' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <motion.a
            href="https://github.com/shaheedmohamed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm tracking-wider hover:bg-white/10 transition-all"
            style={{ ...displayFont, color: 'rgba(255,255,255,0.55)' }}
            whileHover={{ scale: 1.05 }}
          >
            <Github size={16} /> View All on GitHub
          </motion.a>
        </motion.div>
      </div>

      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
