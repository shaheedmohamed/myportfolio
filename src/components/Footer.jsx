import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <footer className="relative py-12 md:py-16 px-4 md:px-8 border-t border-accent/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-black gradient-text mb-2">
              Shaheed Mohamed
            </h3>
            <p className="text-slate-400 text-sm md:text-base">
              Creative developer crafting premium digital experiences
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-4 text-base md:text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Reviews', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-accent transition-colors text-sm md:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-4 text-base md:text-lg">Follow</h4>
            <div className="flex gap-4">
              {[
                { name: 'GitHub', emoji: '🐙' },
                { name: 'LinkedIn', emoji: '💼' },
                { name: 'Twitter', emoji: '𝕏' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-2xl hover:text-accent transition-colors"
                  title={social.name}
                >
                  {social.emoji}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-8"
        />

        {/* Bottom */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm md:text-base"
        >
          <motion.p variants={itemVariants}>
            © {currentYear} Shaheed Mohamed. All rights reserved.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
