import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import SectionSkeleton from '../components/SectionSkeleton'
import useSectionObserver from '../hooks/useSectionObserver'

// Above-the-fold sections render eagerly (Hero already imported above)
// Below-the-fold heavy sections are lazy-loaded to shrink the initial JS payload.
const CodeIntro = lazy(() => import('../components/CodeIntro'))
const About = lazy(() => import('../components/About'))
const Services = lazy(() => import('../components/Services'))
const Skills = lazy(() => import('../components/Skills'))
const Experience = lazy(() => import('../components/Experience'))
const Projects = lazy(() => import('../components/Projects'))
const Achievements = lazy(() => import('../components/Achievements'))
const Blog = lazy(() => import('../components/Blog'))
const Reviews = lazy(() => import('../components/Reviews'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))
const NowPlaying = lazy(() => import('../components/NowPlaying'))

export default function Home() {
  useSectionObserver()
  const location = useLocation()

  // If user lands on /#section anchor (e.g. from 404 page), scroll once mounted.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        // Wait one frame so lazy sections begin loading before scroll
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
      }
    }
  }, [location.hash])

  return (
    <>
      <SEO />
      <Loader />
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton minHeight={400} />}>
          <CodeIntro />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Blog />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Reviews />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <NowPlaying />
      </Suspense>
    </>
  )
}
