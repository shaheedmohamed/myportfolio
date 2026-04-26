import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [theme, setTheme] = useState('dark')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-primary text-white min-h-screen">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Navbar scrollY={scrollY} />
        <Hero />
        <Projects />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
