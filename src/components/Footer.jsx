import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <motion.div className="text-lg font-bold" style={displayFont} whileHover={{ scale: 1.05 }}>
          <span className="text-gradient">SM</span>
        </motion.div>
        <p className="text-xs tracking-wider flex items-center gap-1" style={{ ...displayFont, color: 'rgba(255,255,255,0.3)' }}>
          Built with by Shaheed Mohamed
        </p>
        <p className="text-xs" style={{ ...displayFont, color: 'rgba(255,255,255,0.2)' }}>
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
