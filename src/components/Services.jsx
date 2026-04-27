import { motion } from 'framer-motion'
import { useState } from 'react'
import { Globe, Smartphone, Layers, Sparkles, ArrowRight, Check } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    tagline: 'Modern, blazing-fast websites',
    color: '#8b5cf6',
    price: 'From $499',
    features: [
      'Responsive React / Next.js apps',
      'SEO + Performance optimized',
      'CMS or custom backend',
      '2 weeks delivery',
    ],
  },
  {
    icon: Layers,
    title: 'Full-Stack SaaS',
    tagline: 'End-to-end product engineering',
    color: '#06b6d4',
    price: 'From $1,499',
    featured: true,
    features: [
      'Auth, payments, dashboards',
      'Node.js / PostgreSQL / MongoDB',
      'CI/CD + cloud deployment',
      'Scalable architecture',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Cross-platform native feel',
    color: '#f59e0b',
    price: 'From $899',
    features: [
      'React Native / Expo',
      'iOS + Android single codebase',
      'Push notifications + offline',
      'App store deployment',
    ],
  },
  {
    icon: Sparkles,
    title: 'UI / UX Consulting',
    tagline: 'Polish that converts',
    color: '#ec4899',
    price: 'From $299',
    features: [
      'Design system audit',
      'Animations + micro-interactions',
      'Accessibility review',
      'Conversion optimization',
    ],
  },
]

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #080812 50%, #06060b 100%)', padding: '120px 24px' }}
    >
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 pointer-events-none"
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
          03 — Services
        </motion.span>
        <motion.h2
          className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 24, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What I <span className="text-gradient">offer</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, marginBottom: 64 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          From quick MVPs to scalable products — pick a service that matches your ambition.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 20,
          }}
        >
          {services.map((service, i) => {
            const Icon = service.icon
            const isHovered = hoveredIndex === i
            return (
              <motion.article
                key={service.title}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl glass overflow-hidden group cursor-default"
                style={{
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  borderColor: isHovered ? `${service.color}55` : undefined,
                  boxShadow: isHovered ? `0 0 35px ${service.color}25` : undefined,
                  ...(service.featured
                    ? { background: `linear-gradient(135deg, ${service.color}10, rgba(255,255,255,0.04))` }
                    : {}),
                }}
              >
                {service.featured && (
                  <span
                    className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase font-bold rounded-full"
                    style={{
                      ...displayFont,
                      padding: '4px 10px',
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}aa)`,
                      color: '#fff',
                    }}
                  >
                    Popular
                  </span>
                )}

                <div
                  className="rounded-xl flex items-center justify-center transition-all duration-500"
                  style={{
                    width: 56,
                    height: 56,
                    background: `${service.color}15`,
                    color: service.color,
                    transform: isHovered ? 'rotate(-8deg) scale(1.08)' : 'none',
                  }}
                >
                  <Icon size={26} />
                </div>

                <div>
                  <h3 className="text-white text-xl font-semibold mb-1" style={displayFont}>
                    {service.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {service.tagline}
                  </p>
                </div>

                <div
                  className="text-2xl font-bold"
                  style={{ ...displayFont, color: service.color }}
                >
                  {service.price}
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      <Check size={14} style={{ color: service.color, marginTop: 3, flexShrink: 0 }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={buildWhatsAppUrl(`Hi Shaheed! I'm interested in your "${service.title}" service. Can we discuss?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center justify-between px-5 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
                  style={{
                    ...displayFont,
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                    color: service.color,
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                </a>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
