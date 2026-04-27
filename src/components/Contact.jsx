import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { WHATSAPP_DISPLAY, buildWhatsAppUrl, WhatsAppIcon } from '../lib/whatsapp'
import CVDownload from './CVDownload'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const lines = [
      `Hi Shaheed!`,
      ``,
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      ``,
      `Message:`,
      formState.message,
    ]
    const url = buildWhatsAppUrl(lines.join('\n'))
    window.open(url, '_blank', 'noopener,noreferrer')

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }, 600)
  }

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#06060b', padding: '120px 24px' }}>
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <motion.span className="text-xs tracking-[0.3em] uppercase"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', display: 'block', marginBottom: 16 }}
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          10 — Contact
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
              {
                icon: WhatsAppIcon,
                label: 'WhatsApp',
                value: WHATSAPP_DISPLAY,
                href: buildWhatsAppUrl(),
                accent: '#22c55e',
                external: true,
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Available Worldwide',
                href: null,
                accent: '#a78bfa',
              },
              {
                icon: Clock,
                label: 'Response Time',
                value: 'Usually within 1 hour',
                href: buildWhatsAppUrl('Hi Shaheed! I have a quick question.'),
                accent: '#06b6d4',
                external: true,
              },
            ].map(({ icon: Icon, label, value, href, accent, external }, i) => {
              const card = (
                <motion.div
                  className="group rounded-2xl glass hover:bg-white/[0.06] transition-all"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20 }}
                  whileHover={{ x: 8 }}
                >
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: `${accent}1f`, color: accent }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-wider mb-1"
                      style={{ ...displayFont, color: 'rgba(255,255,255,0.3)' }}
                    >
                      {label}
                    </div>
                    <span
                      className="text-white font-medium"
                      style={{ direction: 'ltr', unicodeBidi: 'embed' }}
                    >
                      {value}
                    </span>
                  </div>
                </motion.div>
              )
              return href ? (
                <a
                  key={i}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  {card}
                </a>
              ) : (
                <div key={i}>{card}</div>
              )
            })}
            <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ marginBottom: 4 }}>
                <CVDownload variant="ghost" label="DOWNLOAD MY CV" />
              </div>
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
                <label htmlFor="contact-name" style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{ ...inputStyle, padding: '14px 16px', fontSize: 14 }}
                  placeholder="Your name"
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="contact-email" style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{ ...inputStyle, padding: '14px 16px', fontSize: 14 }}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="contact-message" style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Message</label>
              <textarea
                id="contact-message"
                name="message"
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
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
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
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ position: 'relative', zIndex: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                {isSubmitting ? 'Opening WhatsApp...' : submitted ? '✓ Sent to WhatsApp!' : (<>Send via WhatsApp <WhatsAppIcon size={16} /></>)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
            <p
              className="text-xs text-center"
              style={{ ...displayFont, color: 'rgba(255,255,255,0.35)', marginTop: -4 }}
            >
              Your message opens directly in WhatsApp — no email needed.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
