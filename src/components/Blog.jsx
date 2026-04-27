import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Calendar, Clock, ArrowUpRight, Loader2, BookOpen, Heart, MessageSquare } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const DEV_TO_USERNAME = 'shaheedmohamed'

const fallbackArticles = [
  {
    id: 'fb-1',
    title: 'Building Buttery-Smooth Animations with Framer Motion',
    description:
      'A practical guide to advanced animation patterns: orchestration, layout animations, and performance tips that keep 60fps on every device.',
    cover_image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60',
    published_at: '2024-12-15',
    reading_time_minutes: 7,
    public_reactions_count: 124,
    comments_count: 18,
    tag_list: ['react', 'animation', 'framer-motion'],
    url: '#',
  },
  {
    id: 'fb-2',
    title: 'From Zero to Production: My Full-Stack Stack in 2025',
    description:
      'The exact tools, services, and patterns I reach for when shipping a SaaS in two weeks — and the trade-offs behind every choice.',
    cover_image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60',
    published_at: '2024-11-08',
    reading_time_minutes: 12,
    public_reactions_count: 256,
    comments_count: 42,
    tag_list: ['nextjs', 'fullstack', 'devops'],
    url: '#',
  },
  {
    id: 'fb-3',
    title: 'Why I Stopped Reaching for useEffect',
    description:
      'A deep dive into derived state, event handlers, and the patterns that replaced 80% of my useEffect calls — with cleaner, faster code.',
    cover_image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=60',
    published_at: '2024-10-22',
    reading_time_minutes: 9,
    public_reactions_count: 412,
    comments_count: 67,
    tag_list: ['react', 'hooks', 'patterns'],
    url: '#',
  },
]

function formatDate(dateString) {
  try {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateString
  }
}

export default function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data)
        } else {
          setArticles(fallbackArticles)
        }
      })
      .catch(() => setArticles(fallbackArticles))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      id="blog"
      className="relative overflow-hidden"
      style={{ background: '#06060b', padding: '120px 24px' }}
    >
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
          08 — Writing
        </motion.span>
        <motion.h2
          className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 24, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Latest <span className="text-gradient">articles</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, marginBottom: 64 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Thoughts on craft, code, and the lessons learned shipping software.
        </motion.p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Loader2 size={32} style={{ color: '#8b5cf6' }} />
            </motion.div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 24,
            }}
          >
            {articles.slice(0, 6).map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target={article.url?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl glass overflow-hidden cursor-pointer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                }}
              >
                {/* Cover image with overlay */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    background:
                      'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))',
                  }}
                >
                  {article.cover_image ? (
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      loading="lazy"
                      className="group-hover:scale-105 transition-transform duration-700"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BookOpen size={48} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(6,6,11,0.85) 100%)',
                    }}
                  />
                  {/* Hover arrow */}
                  <div
                    className="absolute top-4 right-4 rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      padding: 8,
                      transform: 'translateY(-4px)',
                    }}
                  >
                    <ArrowUpRight size={16} style={{ color: '#fff' }} />
                  </div>
                </div>

                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {/* Meta */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.35)',
                      ...displayFont,
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={11} /> {formatDate(article.published_at)}
                    </span>
                    {article.reading_time_minutes && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> {article.reading_time_minutes} min
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors"
                    style={{ ...displayFont, lineHeight: 1.35 }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flexGrow: 1,
                    }}
                  >
                    {article.description}
                  </p>

                  {/* Tags */}
                  {article.tag_list && article.tag_list.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                      {(Array.isArray(article.tag_list)
                        ? article.tag_list
                        : article.tag_list.split(',').map((t) => t.trim())
                      )
                        .slice(0, 3)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] tracking-wider rounded-full"
                            style={{
                              ...displayFont,
                              color: 'rgba(167,139,250,0.6)',
                              background: 'rgba(139,92,246,0.1)',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Reactions */}
                  {(article.public_reactions_count || article.comments_count) > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 14,
                        paddingTop: 12,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {article.public_reactions_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Heart size={11} /> {article.public_reactions_count}
                        </span>
                      )}
                      {article.comments_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MessageSquare size={11} /> {article.comments_count}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          style={{ marginTop: 56, textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={`https://dev.to/${DEV_TO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm tracking-wider hover:bg-white/10 transition-all"
            style={{ ...displayFont, color: 'rgba(255,255,255,0.55)' }}
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen size={16} /> Read all articles
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
