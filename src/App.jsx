import Loader from './components/Loader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import CodeIntro from './components/CodeIntro'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
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
        <Skills />
        <Projects />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
