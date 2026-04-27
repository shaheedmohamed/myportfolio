import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" }

const reviews = [
  {
    id: 9573821,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'تعامل احترافي ومتابعة ممتازة. التسليم كان في الوقت المحدد وبجودة عالية تفوق التوقعات. شاهد مطور موهوب وأنصح بالعمل معه بشدة.',
    date: '2025-02',
    project: 'تطوير موقع ويب احترافي',
    url: 'https://mostaql.com/u/shahid-1/reviews/9573821',
  },
  {
    id: 9149563,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'مبرمج ممتاز ومتقن لعمله، التواصل معه سلس وفهمه للمتطلبات سريع جداً. النتيجة جاءت أفضل مما تخيلت بكثير.',
    date: '2024-12',
    project: 'واجهة مستخدم تفاعلية',
    url: 'https://mostaql.com/u/shahid-1/reviews/9149563',
  },
  {
    id: 8675646,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'تجربة ممتازة من البداية للنهاية. الكود نظيف ومنظم، والأداء سريع. شاهد فهم متطلباتي بدقة وقدم حلول مبتكرة لم أفكر فيها.',
    date: '2024-10',
    project: 'تطبيق إدارة الأعمال',
    url: 'https://mostaql.com/u/shahid-1/reviews/8675646',
  },
  {
    id: 8536136,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'دقة في التنفيذ، إبداع في التصميم، والتزام بالمواعيد. هذه هي الكلمات التي تصف العمل مع شاهد. أنصح به دون تردد.',
    date: '2024-09',
    project: 'منصة رقمية',
    url: 'https://mostaql.com/u/shahid-1/reviews/8536136',
  },
  {
    id: 8530168,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'مطور محترف وموهوب. حول فكرتي إلى منتج رقمي رائع بجودة استثنائية. التواصل ممتاز والاستجابة سريعة لجميع الملاحظات.',
    date: '2024-09',
    project: 'موقع تجارة إلكترونية',
    url: 'https://mostaql.com/u/shahid-1/reviews/8530168',
  },
  {
    id: 8466367,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'عمل رائع بكل المقاييس. أدق التفاصيل تم الاهتمام بها، الواجهات جذابة، والكود قابل للصيانة والتطوير. شراكة ناجحة بكل تأكيد.',
    date: '2024-08',
    project: 'تطوير لوحة تحكم',
    url: 'https://mostaql.com/u/shahid-1/reviews/8466367',
  },
  {
    id: 8429215,
    author: 'صاحب المشروع',
    rating: 5,
    text: 'ممتاز جداً، التزام كامل بالمواصفات والجودة. شاهد لديه خبرة عميقة في React وتصميم الواجهات الحديثة. سأعود للعمل معه قريباً.',
    date: '2024-08',
    project: 'تطبيق ويب تفاعلي',
    url: 'https://mostaql.com/u/shahid-1/reviews/8429215',
  },
]

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = useCallback(() => setActiveIndex((prev) => (prev + 1) % reviews.length), [])
  const prev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section id="reviews" className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #0a0a18 50%, #06060b 100%)', padding: '120px 24px' }}>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.span className="text-xs tracking-[0.3em] uppercase"
          style={{ ...displayFont, color: 'rgba(167,139,250,0.5)', marginBottom: 16, display: 'block' }}
          initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          09 — Reviews
        </motion.span>
        <motion.h2 className="font-bold text-white"
          style={{ ...displayFont, marginBottom: 64, lineHeight: 1.15, fontSize: 'clamp(32px, 5.5vw, 64px)' }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Client <span className="text-gradient">testimonials</span>
        </motion.h2>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            key={activeIndex}
            className="relative rounded-3xl glass glow"
            style={{ padding: '48px 40px', textAlign: 'right', direction: 'rtl' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Quote size={56} style={{ color: 'rgba(139,92,246,0.12)', position: 'absolute', top: 24, right: 24 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 24, direction: 'ltr' }}>
                {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-lg md:text-2xl font-light"
                style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Cairo', 'Playfair Display', serif", lineHeight: 1.8, marginBottom: 32 }}>
                &ldquo;{reviews[activeIndex].text}&rdquo;
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, direction: 'ltr' }}>
                <div style={{ direction: 'rtl', textAlign: 'right' }}>
                  <div className="font-semibold text-white" style={displayFont}>{reviews[activeIndex].author}</div>
                  <div className="text-sm mt-1" style={{ color: 'rgba(167,139,250,0.6)' }}>{reviews[activeIndex].project}</div>
                </div>
                <motion.a
                  href={reviews[activeIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 4 }}
                  style={{
                    ...displayFont,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 999,
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#a78bfa',
                    fontSize: 12,
                    letterSpacing: '0.05em',
                    direction: 'ltr',
                  }}
                >
                  View on Mostaql <ExternalLink size={12} />
                </motion.a>
              </div>
              <div className="text-xs" style={{ ...displayFont, color: 'rgba(255,255,255,0.25)', marginTop: 16, direction: 'ltr' }}>{reviews[activeIndex].date}</div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <motion.button onClick={prev}
              className="p-3 rounded-full glass hover:bg-white/10 transition-all"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={20} />
            </motion.button>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)}
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: i === activeIndex ? '2rem' : '0.5rem', background: i === activeIndex ? '#8b5cf6' : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
            <motion.button onClick={next}
              className="p-3 rounded-full glass hover:bg-white/10 transition-all"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        <motion.div style={{ marginTop: 56, textAlign: 'center' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <a href="https://mostaql.com/u/shahid-1/reviews" target="_blank" rel="noopener noreferrer"
            className="text-sm hover:text-purple-400 transition-colors tracking-wider"
            style={{ ...displayFont, color: 'rgba(255,255,255,0.3)' }}>
            View all reviews on Mostaql &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
