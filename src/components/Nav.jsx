import { LinkMark, Sun, Moon } from './Icons.jsx'

export default function Nav({ theme, onToggleTheme }) {
  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  const top = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="#" onClick={top}>
          <span className="mark">
            <LinkMark />
          </span>
          snip<span className="dim">.sh</span>
        </a>
        <nav className="nav-links">
          <a href="#shorten" onClick={(e) => scrollTo(e, 'shorten')}>
            Shorten
          </a>
          <a href="#features" onClick={(e) => scrollTo(e, 'features')}>
            Features
          </a>
        </nav>
        <div className="nav-right">
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a
            href="#shorten"
            className="btn btn-primary"
            onClick={(e) => scrollTo(e, 'shorten')}
          >
            Shorten a link
          </a>
        </div>
      </div>
    </header>
  )
}
