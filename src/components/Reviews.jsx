import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const reviews = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      role: 'CEO, Tech Startup',
      content: 'Shaheed delivered an exceptional portfolio website. His attention to detail and creative approach exceeded all expectations.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Fatima Al-Mansouri',
      role: 'Product Manager',
      content: 'Working with Shaheed was a game-changer. His innovative solutions and professional approach transformed our vision into reality.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      id: 3,
      name: 'Mohammed Ibrahim',
      role: 'Founder, Digital Agency',
      content: 'Highly skilled developer with excellent communication. Delivered the project on time with outstanding quality.',
      rating: 5,
      avatar: '👨‍💻',
    },
    {
      id: 4,
      name: 'Layla Ahmed',
      role: 'Marketing Director',
      content: 'Shaheed is a true professional. His creative solutions and technical expertise made our project stand out.',
      rating: 5,
      avatar: '👩‍🔬',
    },
  ]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + reviews.length) % reviews.length)
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
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Reviews carousel */}
        <div className="relative h-auto md:h-80">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 md:p-12 h-full flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>

              {/* Review content */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-200 mb-6 md:mb-8 leading-relaxed"
              >
                "{reviews[currentIndex].content}"
              </motion.p>

              {/* Reviewer info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full glass-effect flex items-center justify-center text-2xl md:text-3xl">
                  {reviews[currentIndex].avatar}
                </div>
                <div>
                  <p className="font-bold text-base md:text-lg text-white">
                    {reviews[currentIndex].name}
                  </p>
                  <p className="text-accent text-sm md:text-base">
                    {reviews[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation controls */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-12 md:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="p-3 md:p-4 rounded-full border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-accent w-8' : 'bg-accent/30 w-2'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="p-3 md:p-4 rounded-full border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-20"
        >
          {[
            { label: '50+', desc: 'Projects Completed' },
            { label: '100%', desc: 'Client Satisfaction' },
            { label: '5 yrs', desc: 'Experience' },
            { label: '30+', desc: 'Happy Clients' },
          ].map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 md:p-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {badge.label}
              </p>
              <p className="text-slate-400 text-sm md:text-base">{badge.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
