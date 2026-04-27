import { motion } from 'framer-motion'
import { useState } from 'react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const skillCategories = [
  {
    name: 'Frontend',
    color: '#8b5cf6',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 88 },
      { name: 'TypeScript', level: 90 },
      { name: 'Three.js', level: 82 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'Framer Motion', level: 88 },
    ],
  },
  {
    name: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Express', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'REST APIs', level: 93 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    name: 'Tools & DevOps',
    color: '#f59e0b',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 78 },
      { name: 'Figma', level: 85 },
      { name: 'Linux', level: 80 },
      { name: 'CI/CD', level: 75 },
      { name: 'AWS', level: 72 },
    ],
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="relative overflow-hidden skills-section"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #080812 50%, #06060b 100%)', padding: '120px 24px' }}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.span
          className="text-xs tracking-[0.3em] uppercase block"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', marginBottom: 16 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          04 — Skills
        </motion.span>
        <motion.h2
          className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 32, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-gradient">tech arsenal</span>
        </motion.h2>

        <motion.div
          className="skills-tabs"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className="rounded-full transition-all duration-500"
              style={{
                ...displayFont,
                padding: '10px 18px',
                fontSize: 13,
                letterSpacing: '0.05em',
                ...(activeCategory === i
                  ? {
                      background: `linear-gradient(135deg, ${cat.color}35, ${cat.color}15)`,
                      boxShadow: `0 0 25px ${cat.color}20`,
                      color: '#fff',
                      border: `1px solid ${cat.color}40`,
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.4)',
                    }),
              }}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="skills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', columnGap: 16, rowGap: 12 }}
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {skillCategories[activeCategory].skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card relative rounded-2xl glass overflow-hidden hover:bg-white/[0.06] transition-all duration-500"
              style={{ padding: 20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 className="font-medium text-white" style={{ ...displayFont, fontSize: 14 }}>{skill.name}</h3>
                <span className="font-bold" style={{ ...displayFont, fontSize: 13, color: skillCategories[activeCategory].color }}>
                  {skill.level}%
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].color}80)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="skills-tags"
          style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {['JavaScript', 'Python', 'HTML5', 'CSS3', 'SASS', 'Redux', 'Webpack', 'Vite', 'Jest', 'Prisma'].map(
            (tag, i) => (
              <motion.span
                key={tag}
                className="rounded-full glass"
                style={{ ...displayFont, padding: '6px 14px', fontSize: 11, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.3)' }}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
