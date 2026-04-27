import Loader from './components/Loader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import CodeIntro from './components/CodeIntro'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Blog from './components/Blog'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NowPlaying from './components/NowPlaying'
import useSectionObserver from './hooks/useSectionObserver'

function App() {
  useSectionObserver()

  return (
    <>
      <Loader />
      <Navigation />
      <main>
        <Hero />
        <CodeIntro />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Blog />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <NowPlaying />
    </>
  )
}

export default App
