import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

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
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'shaheed@example.com',
                href: 'mailto:shaheed@example.com',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+966 50 123 4567',
                href: 'tel:+966501234567',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Saudi Arabia',
                href: '#',
              },
            ].map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={index}
                  href={contact.href}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg glass-effect flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm md:text-base mb-1">
                      {contact.label}
                    </p>
                    <p className="text-white text-base md:text-lg font-semibold group-hover:text-accent transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}

            {/* Social links */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-accent/20">
              <p className="text-slate-400 mb-4 text-sm md:text-base">Follow me on</p>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', emoji: '🐙', url: 'https://github.com/shaheedmohamed' },
                  { name: 'LinkedIn', emoji: '💼', url: '#' },
                  { name: 'Twitter', emoji: '𝕏', url: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg glass-effect flex items-center justify-center text-xl md:text-2xl hover:bg-accent/20 transition-colors"
                    title={social.name}
                  >
                    {social.emoji}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm md:text-base font-medium text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-secondary/50 border border-accent/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
                placeholder="Shaheed"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm md:text-base font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-secondary/50 border border-accent/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm md:text-base font-medium text-slate-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-secondary/50 border border-accent/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
                placeholder="Project inquiry"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm md:text-base font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-secondary/50 border border-accent/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={submitted}
              className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-accent to-accent-dark text-primary font-bold rounded-lg flex items-center justify-center gap-2 glow-effect hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {submitted ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ✓
                  </motion.span>
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
