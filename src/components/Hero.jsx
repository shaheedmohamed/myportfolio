import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-dark rounded-full mix-blend-screen filter blur-3xl opacity-15"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="absolute w-96 h-96 pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-accent to-accent-dark opacity-5 blur-3xl" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            className="inline-block px-4 py-2 rounded-full border border-accent/30 text-accent text-sm md:text-base font-medium glass-effect"
            whileHover={{ scale: 1.05, borderColor: '#00d9ff' }}
          >
            Welcome to my digital space
          </motion.span>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
            <span className="block text-white">I'm</span>
            <motion.span
              className="block gradient-text text-5xl md:text-8xl lg:text-9xl font-black"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Shaheed Mohamed
            </motion.span>
          </h1>
        </motion.div>

        {/* Slogan */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Crafting <span className="text-accent font-semibold">digital experiences</span> that inspire,
            <br />
            <span className="text-accent font-semibold">innovate</span>, and transform ideas into reality
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-accent to-accent-dark text-primary font-bold rounded-lg text-base md:text-lg transition-all duration-300 glow-effect"
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#00d9ff' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-3 md:py-4 border-2 border-accent/50 text-accent font-bold rounded-lg text-base md:text-lg hover:border-accent transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="flex justify-center gap-8 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg glass-effect flex items-center justify-center text-accent text-2xl md:text-3xl font-bold"
          >
            ⚡
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg glass-effect flex items-center justify-center text-accent text-2xl md:text-3xl font-bold"
          >
            🎨
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg glass-effect flex items-center justify-center text-accent text-2xl md:text-3xl font-bold"
          >
            💡
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mt-8 md:mt-12"
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
