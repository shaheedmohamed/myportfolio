import { motion } from 'framer-motion'
import { Download, Check, FileText } from 'lucide-react'
import { useState } from 'react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const CV_PATH = '/ShaheedCV.pdf'
const CV_FILENAME = 'Shaheed-Mohamed-CV.pdf'

/**
 * Reusable CV download button.
 * Variants:
 *   - 'primary': solid purple gradient (default)
 *   - 'ghost':   minimal glass style for secondary placement
 *   - 'pill':    compact pill for floating placements
 */
export default function CVDownload({ variant = 'primary', label = 'DOWNLOAD CV', className = '' }) {
  const [downloaded, setDownloaded] = useState(false)

  const handleClick = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2400)
  }

  const styleByVariant = {
    primary: {
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      color: '#fff',
      padding: '12px 22px',
      borderRadius: 999,
      fontSize: 13,
      letterSpacing: '0.08em',
      minHeight: 46,
      border: 'none',
    },
    ghost: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.85)',
      padding: '12px 22px',
      borderRadius: 999,
      fontSize: 13,
      letterSpacing: '0.08em',
      minHeight: 46,
    },
    pill: {
      background: 'rgba(139,92,246,0.12)',
      border: '1px solid rgba(167,139,250,0.3)',
      color: '#a78bfa',
      padding: '8px 14px',
      borderRadius: 999,
      fontSize: 12,
      letterSpacing: '0.06em',
      minHeight: 36,
    },
  }

  const Icon = downloaded ? Check : variant === 'pill' ? FileText : Download

  return (
    <motion.a
      href={CV_PATH}
      download={CV_FILENAME}
      onClick={handleClick}
      target="_blank"
      rel="noopener"
      aria-label="Download Shaheed Mohamed CV (PDF)"
      className={`inline-flex items-center justify-center gap-2 ${className}`}
      style={{
        ...displayFont,
        textDecoration: 'none',
        ...styleByVariant[variant],
      }}
      whileHover={
        variant === 'primary'
          ? { scale: 1.04, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }
          : { scale: 1.04 }
      }
      whileTap={{ scale: 0.96 }}
    >
      <Icon size={variant === 'pill' ? 13 : 15} />
      <span>{downloaded ? 'DOWNLOADED' : label}</span>
    </motion.a>
  )
}
