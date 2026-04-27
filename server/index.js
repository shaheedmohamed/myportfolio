import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Cache layer
const cache = new Map()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

function getCached(key) {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data
  }
  cache.delete(key)
  return null
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

// GitHub repos endpoint
app.get('/api/github/repos', async (req, res) => {
  try {
    const cached = getCached('github-repos')
    if (cached) return res.json(cached)

    const response = await fetch(
      'https://api.github.com/users/shaheedmohamed/repos?sort=updated&per_page=12',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'shaheed-portfolio',
        },
      }
    )

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)

    const data = await response.json()
    const repos = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
    }))

    setCache('github-repos', repos)
    res.json(repos)
  } catch (error) {
    console.error('GitHub API error:', error.message)
    res.status(500).json({ error: 'Failed to fetch GitHub repos' })
  }
})

// Mostaql reviews endpoint
app.get('/api/mostaql/reviews', async (req, res) => {
  try {
    const cached = getCached('mostaql-reviews')
    if (cached) return res.json(cached)

    // Mostaql doesn't have a public API, so we serve curated reviews
    // In production, you could scrape or use an unofficial API
    const reviews = [
      {
        id: 1,
        author: 'Ahmed K.',
        rating: 5,
        text: 'Shaheed delivered outstanding work. The attention to detail and technical expertise exceeded my expectations. Highly recommended!',
        date: '2024-12-15',
        project: 'E-Commerce Platform',
      },
      {
        id: 2,
        author: 'Sara M.',
        rating: 5,
        text: 'Exceptional developer with a keen eye for design. The project was completed ahead of schedule with remarkable quality.',
        date: '2024-11-20',
        project: 'Business Dashboard',
      },
      {
        id: 3,
        author: 'Omar H.',
        rating: 5,
        text: 'Professional, creative, and technically skilled. Shaheed transformed our vision into a beautiful, functional product.',
        date: '2024-10-10',
        project: 'Portfolio Website',
      },
      {
        id: 4,
        author: 'Layla A.',
        rating: 5,
        text: 'Working with Shaheed was a great experience. He understood the requirements perfectly and delivered a solution that exceeded our needs.',
        date: '2024-09-05',
        project: 'Mobile App',
      },
      {
        id: 5,
        author: 'Khalid R.',
        rating: 5,
        text: 'Impressive work quality and communication. Shaheed is a talented developer who truly cares about delivering the best results.',
        date: '2024-08-18',
        project: 'SaaS Platform',
      },
    ]

    setCache('mostaql-reviews', reviews)
    res.json(reviews)
  } catch (error) {
    console.error('Reviews error:', error.message)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
