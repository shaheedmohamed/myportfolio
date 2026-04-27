import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import useStore from '../store/useStore'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const navItems = [
  { id: 'hero', label: '01', name: 'Home' },
  { id: 'about', label: '02', name: 'About' },
  { id: 'services', label: '03', name: 'Services' },
  { id: 'skills', label: '04', name: 'Skills' },
  { id: 'experience', label: '05', name: 'Journey' },
  { id: 'projects', label: '06', name: 'Projects' },
  { id: 'achievements', label: '07', name: 'Awards' },
  { id: 'blog', label: '08', name: 'Blog' },
  { id: 'reviews', label: '09', name: 'Reviews' },
  { id: 'contact', label: '10', name: 'Contact' },
]

export default function Navigation() {
  const { activeSection, theme, toggleTheme, isMenuOpen, setIsMenuOpen } = useStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Side dot nav - desktop */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => scrollToSection(item.id)} className="group relative flex items-center justify-end gap-3">
            <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ ...displayFont, color: activeSection === item.id ? '#a78bfa' : 'rgba(255,255,255,0.4)' }}>
              {item.name}
            </span>
            <span className="block rounded-full transition-all duration-500"
              style={activeSection === item.id
                ? { width: 12, height: 12, background: '#8b5cf6', boxShadow: '0 0 12px rgba(139,92,246,0.6)' }
                : { width: 8, height: 8, background: 'rgba(255,255,255,0.2)' }} />
          </button>
        ))}
      </nav>

      {/* Top bar */}
      <motion.header
        className="nav-header fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? { background: 'rgba(6,6,11,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 0' } : { padding: '16px 0' }}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="nav-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.button onClick={() => scrollToSection('hero')} className="text-xl font-bold" style={displayFont} whileHover={{ scale: 1.05 }}>
            <span className="text-gradient">SM</span>
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 4 }}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className="transition-all duration-300"
                  style={{
                    ...displayFont,
                    padding: '8px 12px',
                    borderRadius: 999,
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    ...(activeSection === item.id
                      ? { background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.5)' }),
                  }}>
                  {item.name}
                </button>
              ))}
            </div>

            <motion.a
              href="/ShaheedCV.pdf"
              download="Shaheed-Mohamed-CV.pdf"
              target="_blank"
              rel="noopener"
              aria-label="Download CV"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full transition-all"
              style={{
                ...displayFont,
                padding: '7px 14px',
                fontSize: 11,
                letterSpacing: '0.08em',
                color: '#a78bfa',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(167,139,250,0.3)',
                textDecoration: 'none',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(139,92,246,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={12} /> CV
            </motion.a>

            <motion.button onClick={toggleTheme} className="rounded-full glass hover:bg-white/10 transition-colors"
              style={{ padding: 10, color: 'rgba(255,255,255,0.5)' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden rounded-full glass"
              style={{ padding: 10, color: 'rgba(255,255,255,0.6)' }} whileTap={{ scale: 0.9 }}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="fixed inset-0 z-40 flex items-center justify-center lg:hidden"
            style={{ background: 'rgba(6,6,11,0.95)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button key={item.id} onClick={() => scrollToSection(item.id)} className="group flex items-center gap-4"
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <span className="text-xs" style={{ ...displayFont, color: 'rgba(139,92,246,0.4)' }}>{item.label}</span>
                  <span className="text-3xl font-light tracking-tight"
                    style={{ ...displayFont, ...(activeSection === item.id ? {} : { color: 'rgba(255,255,255,0.6)' }) }}>
                    {activeSection === item.id ? <span className="text-gradient">{item.name}</span> : item.name}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
