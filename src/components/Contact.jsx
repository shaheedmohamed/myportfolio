import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }
const inputStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  outline: 'none',
  borderRadius: 12,
  width: '100%',
  transition: 'border-color 0.2s ease, background 0.2s ease',
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#06060b', padding: '120px 24px' }}>
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.span className="text-xs tracking-[0.3em] uppercase"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', display: 'block', marginBottom: 16 }}
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          06 — Contact
        </motion.span>
        <motion.h2 className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 24, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Let&apos;s build something <span className="text-gradient">extraordinary</span>
        </motion.h2>
        <motion.p className="text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 600, marginBottom: 64, lineHeight: 1.7 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          Have a project in mind? Let&apos;s discuss how we can create something remarkable together.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 48 }}>
          <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[
              { icon: Mail, label: 'Email', value: 'shaheedmhmed@gmail.com', href: 'mailto:shaheedmhmed@gmail.com' },
              { icon: MapPin, label: 'Location', value: 'Available Worldwide', href: null },
              { icon: Phone, label: 'Status', value: 'Open for freelance', href: null },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div key={i} className="group rounded-2xl glass hover:bg-white/[0.06] transition-all" style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20 }} whileHover={{ x: 8 }}>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs tracking-wider mb-1" style={{ ...displayFont, color: 'rgba(255,255,255,0.3)' }}>{label}</div>
                  {href ? (
                    <a href={href} className="text-white hover:text-purple-400 transition-colors font-medium">{value}</a>
                  ) : (
                    <span className="text-white font-medium">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}
            <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'GitHub', href: 'https://github.com/shaheedmohamed', sub: '@shaheedmohamed' },
                { label: 'Mostaql', href: 'https://mostaql.com/u/shahid-1', sub: '@shahid-1' },
              ].map(({ label, href, sub }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass hover:bg-white/[0.06] transition-all"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 14,
                    textDecoration: 'none',
                  }}
                  whileHover={{ x: 6 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ ...displayFont, color: '#fff', fontSize: 14, fontWeight: 500 }}>{label}</span>
                    <span style={{ ...displayFont, color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{sub}</span>
                  </div>
                  <ArrowUpRight size={18} style={{ color: 'rgba(167,139,250,0.6)' }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{ ...inputStyle, padding: '14px 16px', fontSize: 14 }}
                  placeholder="Your name"
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{ ...inputStyle, padding: '14px 16px', fontSize: 14 }}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Message</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={6}
                style={{ ...inputStyle, padding: '14px 16px', fontSize: 14, resize: 'none', fontFamily: 'inherit', lineHeight: 1.6 }}
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative overflow-hidden"
              style={{
                ...displayFont,
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                padding: '16px 32px',
                borderRadius: 12,
                fontSize: 14,
                letterSpacing: '0.08em',
                color: '#fff',
                border: 'none',
                cursor: isSubmitting ? 'wait' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                marginTop: 8,
                minHeight: 52,
                width: '100%',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ position: 'relative', zIndex: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {isSubmitting ? 'Sending...' : submitted ? '✓ Message Sent!' : (<>Send Message <Send size={14} /></>)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
