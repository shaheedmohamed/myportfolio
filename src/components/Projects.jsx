import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, GitBranch, ExternalLink } from 'lucide-react'
import axios from 'axios'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/shaheedmohamed/repos', {
          params: {
            sort: 'stars',
            direction: 'desc',
            per_page: 6,
          },
        })
        setProjects(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([
          {
            id: 1,
            name: 'Portfolio Website',
            description: 'Premium portfolio with advanced animations and interactions',
            url: '#',
            language: 'React',
            stars: 24,
          },
          {
            id: 2,
            name: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration',
            url: '#',
            language: 'Node.js',
            stars: 18,
          },
          {
            id: 3,
            name: 'AI Chat Application',
            description: 'Real-time chat app with AI-powered responses',
            url: '#',
            language: 'React',
            stars: 32,
          },
        ])
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore my latest work and innovative solutions
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['all', 'React', 'Node.js', 'Full Stack'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-accent to-accent-dark text-primary glow-effect'
                  : 'border border-accent/30 text-accent hover:border-accent'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full mx-auto"
            />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group glass-effect rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Project card background */}
                <div className="relative h-40 md:h-48 bg-gradient-to-br from-accent/10 to-accent-dark/10 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                    💻
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project meta */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-accent/10 text-accent">
                        {project.language || 'JavaScript'}
                      </span>
                    </div>
                    {project.stargazers_count && (
                      <div className="flex items-center gap-1 text-accent text-sm">
                        <Star className="w-4 h-4" />
                        {project.stargazers_count}
                      </div>
                    )}
                  </div>

                  {/* Project links */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.html_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors text-sm md:text-base"
                    >
                      <GitBranch className="w-4 h-4" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.html_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-accent/30 hover:border-accent text-accent rounded-lg transition-colors text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.a
            href="https://github.com/shaheedmohamed"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 md:px-10 py-3 md:py-4 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all duration-300"
          >
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
