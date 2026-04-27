import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Star, GitFork, Users, BookMarked } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const GITHUB_USER = 'shaheedmohamed'

const fallbackStats = {
  public_repos: 24,
  followers: 38,
  following: 12,
  totalStars: 156,
  totalForks: 42,
  topLanguages: [
    { name: 'JavaScript', percent: 42, color: '#f7df1e' },
    { name: 'TypeScript', percent: 28, color: '#3178c6' },
    { name: 'Python', percent: 14, color: '#3572a5' },
    { name: 'CSS', percent: 10, color: '#563d7c' },
    { name: 'Other', percent: 6, color: '#8b5cf6' },
  ],
}

const languageColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  PHP: '#777bb4',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#701516',
  Shell: '#89e051',
}

function AnimatedNumber({ value, duration = 1.2 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const from = 0
    const to = Number(value) || 0
    const step = (now) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(from + (to - from) * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <>{display.toLocaleString()}</>
}

export default function GitHubStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`),
        ])
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub fetch failed')

        const user = await userRes.json()
        const repos = await reposRes.json()
        if (!Array.isArray(repos)) throw new Error('Invalid repos')

        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
        const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

        // Aggregate languages
        const langCounts = {}
        repos.forEach((r) => {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
        })
        const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1
        const sorted = Object.entries(langCounts).sort((a, b) => b[1] - a[1])
        const top = sorted.slice(0, 4).map(([name, count]) => ({
          name,
          percent: Math.round((count / total) * 100),
          color: languageColors[name] || '#8b5cf6',
        }))
        const otherPct = 100 - top.reduce((sum, l) => sum + l.percent, 0)
        if (otherPct > 0 && sorted.length > 4) {
          top.push({ name: 'Other', percent: otherPct, color: '#8b5cf6' })
        }

        if (!cancelled) {
          setStats({
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            totalStars,
            totalForks,
            topLanguages: top.length > 0 ? top : fallbackStats.topLanguages,
          })
        }
      } catch {
        if (!cancelled) setStats(fallbackStats)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const data = stats || fallbackStats

  const statItems = [
    { icon: BookMarked, label: 'Repositories', value: data.public_repos, color: '#8b5cf6' },
    { icon: Star, label: 'Total Stars', value: data.totalStars, color: '#f59e0b' },
    { icon: GitFork, label: 'Total Forks', value: data.totalForks, color: '#06b6d4' },
    { icon: Users, label: 'Followers', value: data.followers, color: '#ec4899' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl glass overflow-hidden"
      style={{ marginBottom: 48 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            className="rounded-lg flex items-center justify-center"
            style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.05)', color: '#fff' }}
          >
            <Github size={20} />
          </div>
          <div>
            <div className="text-white font-semibold" style={displayFont}>
              @{GITHUB_USER}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Live GitHub stats
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.6)' }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          Live
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.06)',
        }}
      >
        {statItems.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#06060b',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={14} style={{ color: item.color }} />
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ ...displayFont, color: 'rgba(255,255,255,0.4)' }}
                >
                  {item.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white" style={displayFont}>
                <AnimatedNumber value={item.value} />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Top languages bar */}
      <div style={{ padding: '20px 28px' }}>
        <div
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ ...displayFont, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}
        >
          Top Languages
        </div>
        <div
          style={{
            display: 'flex',
            height: 8,
            borderRadius: 999,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          {data.topLanguages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ width: 0 }}
              whileInView={{ width: `${lang.percent}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: lang.color }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14 }}>
          {data.topLanguages.map((lang) => (
            <div key={lang.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: lang.color,
                }}
              />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {lang.name}
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {lang.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
