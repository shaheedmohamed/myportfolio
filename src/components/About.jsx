import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Rocket, Target, Zap } from 'lucide-react'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '∞', label: 'Lines of Code' },
]

const values = [
  { icon: Target, title: 'Precision', desc: 'Pixel-perfect attention to every detail' },
  { icon: Zap, title: 'Performance', desc: 'Optimized for speed and efficiency' },
  { icon: Code2, title: 'Clean Code', desc: 'Maintainable and scalable architecture' },
  { icon: Rocket, title: 'Innovation', desc: 'Pushing boundaries with cutting-edge tech' },
]

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

export default function About() {
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#06060b', padding: '120px 24px' }}
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.div style={{ marginBottom: 80 }}>
          <motion.span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', display: 'block', marginBottom: 16 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            02 — About
          </motion.span>
          <motion.h2
            className="font-bold text-white"
            style={{ ...displayFont, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Building the future,{' '}
            <span className="text-gradient">one pixel</span>
            <br className="hidden sm:block" /> at a time
          </motion.h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 64, alignItems: 'start' }}>
          <motion.div style={{ y }}>
            <motion.div
              className="text-base md:text-lg"
              style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 20 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                I&apos;m <span className="text-white font-medium">Shaheed Mohamed</span>, a full-stack developer
                passionate about crafting digital experiences that blur the line between technology and art.
              </p>
              <p>
                With expertise spanning <span className="text-purple-400">React</span>,{' '}
                <span className="text-purple-400">Node.js</span>,{' '}
                <span className="text-purple-400">Three.js</span>, and modern web technologies,
                I transform complex ideas into elegant, performant solutions that users love.
              </p>
              <p>
                I believe every project is a story waiting to be told. My approach combines
                technical precision with creative vision, resulting in products that don&apos;t
                just work — they <span className="text-white italic" style={{ fontFamily: "'Playfair Display', serif" }}>inspire</span>.
              </p>
            </motion.div>

            <motion.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12, marginTop: 48 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl glass"
                  style={{ textAlign: 'center', padding: '20px 12px' }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient" style={displayFont}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] mt-1.5 tracking-wider" style={{ ...displayFont, color: 'rgba(255,255,255,0.35)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {values.map((item, i) => (
              <motion.div
                key={i}
                className="group p-6 rounded-2xl glass cursor-default hover:bg-white/[0.06] transition-all duration-500"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                whileHover={{ x: 8 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl transition-colors"
                    style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg mb-1" style={displayFont}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
