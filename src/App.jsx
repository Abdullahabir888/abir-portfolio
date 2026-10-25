import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Products from './components/Products'
import Projects from './components/Projects'
import Workflow from './components/Workflow'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { BackToTop, ScrollProgress } from './components/ScrollChrome'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Products />
        <Projects />
        <Workflow />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
