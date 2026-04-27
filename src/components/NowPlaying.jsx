import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Music, X, Volume2 } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

// Sample track displayed when there's no live API.
// Swap with a real Spotify endpoint or backend proxy when ready.
const fallbackTrack = {
  isPlaying: true,
  title: 'Lofi Coding Mix',
  artist: 'Late Night Beats',
  album: 'Focus Sessions Vol. 4',
  albumImageUrl:
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=200&q=60',
  songUrl: 'https://open.spotify.com',
  progressMs: 78000,
  durationMs: 215000,
}

function formatTime(ms) {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function NowPlaying() {
  const [track] = useState(fallbackTrack)
  const [progress, setProgress] = useState(track.progressMs)
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Reveal after a short delay so it doesn't fight the loader
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 4000)
    return () => clearTimeout(t)
  }, [])

  // Simulate progress
  useEffect(() => {
    if (!track.isPlaying) return
    const id = setInterval(() => {
      setProgress((p) => (p + 1000) % track.durationMs)
    }, 1000)
    return () => clearInterval(id)
  }, [track])

  const percent = (progress / track.durationMs) * 100

  if (dismissed || !mounted) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="fixed left-4 bottom-4 z-40"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
      >
        {open ? (
          <motion.div
            layout
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden glass-strong"
            style={{
              width: 320,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(34,197,94,0.15)',
            }}
          >
            <div style={{ position: 'relative' }}>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 8px #22c55e',
                    }}
                  />
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ ...displayFont, color: 'rgba(34,197,94,0.9)' }}
                  >
                    Now Playing
                  </span>
                </div>
                <button
                  onClick={() => setDismissed(true)}
                  className="rounded-md hover:bg-white/10 transition-colors"
                  style={{ padding: 4, color: 'rgba(255,255,255,0.4)' }}
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                {/* Album art with vinyl rotation */}
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <motion.img
                    src={track.albumImageUrl}
                    alt={track.album}
                    animate={track.isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: '#06060b',
                      transform: 'translate(-50%, -50%)',
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </a>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <a
                    href={track.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold text-sm hover:text-purple-400 transition-colors"
                    style={{
                      ...displayFont,
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textDecoration: 'none',
                    }}
                  >
                    {track.title}
                  </a>
                  <div
                    className="text-xs"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {track.artist}
                  </div>

                  {/* Equalizer bars */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginTop: 8, height: 14 }}>
                    {[1, 0.6, 0.85, 0.5, 0.95].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={track.isPlaying ? { scaleY: [h, h * 0.4, h] } : { scaleY: 0.3 }}
                        transition={{
                          duration: 0.7 + i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          display: 'inline-block',
                          width: 3,
                          height: '100%',
                          background: 'linear-gradient(180deg, #22c55e, #16a34a)',
                          borderRadius: 2,
                          transformOrigin: 'bottom',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ padding: '0 16px 14px' }}>
                <div
                  style={{
                    height: 3,
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'linear' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #22c55e, #16a34a)',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 6,
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.35)',
                    ...displayFont,
                    letterSpacing: '0.05em',
                  }}
                >
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(track.durationMs)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            layout
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={() => setOpen(true)}
            className="rounded-full glass-strong flex items-center gap-2 hover:bg-white/10 transition-colors"
            style={{
              padding: '10px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }}
            />
            <Music size={14} style={{ color: 'rgba(255,255,255,0.7)' }} />
            <span
              className="text-xs"
              style={{ ...displayFont, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}
            >
              Now Playing
            </span>
            <Volume2 size={12} style={{ color: 'rgba(34,197,94,0.8)' }} />
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
