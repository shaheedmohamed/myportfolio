import { motion } from 'framer-motion'
import { useState } from 'react'
import { Award, Trophy, Medal, Star, ExternalLink } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const badges = [
  {
    icon: Award,
    title: 'Meta Front-End Developer',
    issuer: 'Coursera · Meta',
    year: '2024',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2 0%, #0a4fb8 100%)',
    url: '#',
  },
  {
    icon: Trophy,
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    color: '#ff9900',
    gradient: 'linear-gradient(135deg, #ff9900 0%, #cc6600 100%)',
    url: '#',
  },
  {
    icon: Medal,
    title: 'Advanced React',
    issuer: 'Udemy',
    year: '2023',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
    url: '#',
  },
  {
    icon: Star,
    title: 'Top Rated · Mostaql',
    issuer: 'Verified Freelancer',
    year: '2024',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    url: 'https://mostaql.com/u/shahid-1',
  },
  {
    icon: Award,
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    year: '2022',
    color: '#f7df1e',
    gradient: 'linear-gradient(135deg, #f7df1e 0%, #b8a116 100%)',
    url: '#',
  },
  {
    icon: Medal,
    title: 'TypeScript Mastery',
    issuer: 'Frontend Masters',
    year: '2023',
    color: '#3178c6',
    gradient: 'linear-gradient(135deg, #3178c6 0%, #1e4d8c 100%)',
    url: '#',
  },
]

export default function Achievements() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      id="achievements"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #080812 50%, #06060b 100%)', padding: '120px 24px' }}
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)' }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.span
          className="text-xs tracking-[0.3em] uppercase block"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', marginBottom: 16 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          07 — Recognition
        </motion.span>
        <motion.h2
          className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 24, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Certifications & <span className="text-gradient">badges</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, marginBottom: 64 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          A growing collection of credentials backing real-world delivery.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 20,
          }}
        >
          {badges.map((badge, i) => {
            const Icon = badge.icon
            const isHovered = hoveredIndex === i
            return (
              <motion.a
                key={badge.title}
                href={badge.url}
                target={badge.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 120 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl glass overflow-hidden group cursor-pointer"
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  textDecoration: 'none',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  borderColor: isHovered ? `${badge.color}55` : undefined,
                  boxShadow: isHovered ? `0 12px 40px ${badge.color}30` : undefined,
                }}
              >
                {/* Animated shine on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, transparent 30%, ${badge.color}15 50%, transparent 70%)`,
                    transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 0.8s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* Badge medallion */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <motion.div
                    animate={{ rotate: isHovered ? [0, -8, 8, 0] : 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl flex items-center justify-center relative"
                    style={{
                      width: 64,
                      height: 64,
                      background: badge.gradient,
                      boxShadow: `0 8px 24px ${badge.color}40, inset 0 1px 0 rgba(255,255,255,0.3)`,
                    }}
                  >
                    <Icon size={28} color="#fff" strokeWidth={2.2} />
                    {/* Ribbon accent */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        width: 20,
                        height: 8,
                        background: badge.color,
                        clipPath: 'polygon(0 0, 100% 0, 80% 100%, 50% 70%, 20% 100%)',
                        opacity: 0.7,
                      }}
                    />
                  </motion.div>
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase font-bold rounded-full"
                    style={{
                      ...displayFont,
                      padding: '4px 10px',
                      background: `${badge.color}15`,
                      color: badge.color,
                      border: `1px solid ${badge.color}30`,
                    }}
                  >
                    {badge.year}
                  </span>
                </div>

                <div style={{ position: 'relative' }}>
                  <h3 className="text-white font-semibold text-base mb-1" style={displayFont}>
                    {badge.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {badge.issuer}
                  </p>
                </div>

                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    color: badge.color,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    ...displayFont,
                    letterSpacing: '0.08em',
                  }}
                >
                  <span>VERIFY</span>
                  <ExternalLink size={11} />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
