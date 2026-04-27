import { motion } from 'framer-motion'
import { useState } from 'react'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    color: '#8b5cf6',
    title: 'Senior Full-Stack Developer',
    org: 'Freelance · Remote',
    period: '2023 — Present',
    description:
      'Building production-grade web apps for clients across the Middle East and Europe. 50+ delivered projects.',
    tags: ['React', 'Next.js', 'Node.js', 'AWS'],
  },
  {
    type: 'work',
    icon: Briefcase,
    color: '#06b6d4',
    title: 'Frontend Developer',
    org: 'Agency · Hybrid',
    period: '2022 — 2023',
    description:
      'Led frontend efforts on 12+ commercial projects with focus on performance and design fidelity.',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
  },
  {
    type: 'education',
    icon: GraduationCap,
    color: '#f59e0b',
    title: 'Computer Science',
    org: 'University Degree',
    period: '2019 — 2023',
    description:
      'Focused on software engineering, algorithms, and human–computer interaction. Graduated with honors.',
    tags: ['CS Fundamentals', 'Algorithms', 'HCI'],
  },
  {
    type: 'achievement',
    icon: Award,
    color: '#ec4899',
    title: 'Top Rated Freelancer',
    org: 'Mostaql Platform',
    period: '2024',
    description:
      '5-star average rating across 30+ verified clients with consistent on-time delivery.',
    tags: ['Client Success', '5★ Rating'],
  },
]

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      id="experience"
      className="relative overflow-hidden"
      style={{ background: '#06060b', padding: '120px 24px' }}
    >
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.span
          className="text-xs tracking-[0.3em] uppercase block"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', marginBottom: 16 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          05 — Journey
        </motion.span>
        <motion.h2
          className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 24, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The <span className="text-gradient">path</span> so far
        </motion.h2>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, marginBottom: 64 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          A timeline of milestones in code, learning, and craft.
        </motion.p>

        <div style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 19,
              top: 8,
              bottom: 8,
              width: 2,
              background:
                'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, rgba(6,182,212,0.4) 50%, rgba(245,158,11,0.4) 100%)',
              borderRadius: 2,
            }}
          />

          {timeline.map((item, i) => {
            const Icon = item.icon
            const isActive = activeIndex === i
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  position: 'relative',
                  paddingBottom: i === timeline.length - 1 ? 0 : 40,
                  cursor: 'pointer',
                }}
              >
                {/* Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    boxShadow: isActive ? `0 0 20px ${item.color}` : `0 0 0px ${item.color}`,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    left: -32,
                    top: 4,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: item.color,
                    border: '3px solid #06060b',
                  }}
                />

                <motion.div
                  animate={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                    borderColor: isActive ? `${item.color}55` : 'rgba(255,255,255,0.08)',
                  }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl"
                  style={{
                    padding: 24,
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    transition: 'transform 0.3s ease',
                    transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      marginBottom: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{
                        width: 40,
                        height: 40,
                        background: `${item.color}15`,
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <h3 className="text-white font-semibold text-lg" style={displayFont}>
                        {item.title}
                      </h3>
                      <div
                        className="text-sm mt-0.5"
                        style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.org}
                      </div>
                    </div>
                    <div
                      className="text-xs tracking-wider"
                      style={{
                        ...displayFont,
                        color: 'rgba(255,255,255,0.4)',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '4px 10px',
                        borderRadius: 999,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.period}
                    </div>
                  </div>

                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                      lineHeight: 1.7,
                      marginBottom: 14,
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] tracking-wider rounded-full"
                        style={{
                          ...displayFont,
                          color: `${item.color}cc`,
                          background: `${item.color}10`,
                          border: `1px solid ${item.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
