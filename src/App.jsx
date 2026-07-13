import { useTheme } from './hooks/useTheme.js'
import Background from './components/Background.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <>
      <Background />
      <div className="shell">
        <Nav theme={theme} onToggleTheme={toggle} />
        <Hero />
        <Features />
        <Cta />
        <Footer />
      </div>
    </>
  )
}
