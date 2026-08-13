import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'

function Navbar() {
  const headerRef = useRef(null)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${header.offsetHeight}px`
      )
    }

    setHeight()

    const observer = new ResizeObserver(setHeight)
    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  return (
    <header ref={headerRef} className="w-full bg-background">
      <nav className="mx-auto flex items-center justify-between px-5 py-3">
        <Link to="/" className="shrink-0">
          <img src="/logo.svg" alt="Skin is Ki" width={162} height={30} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/about" className="text-h3 text-dark hover:text-accent">
            About
          </Link>
          <Link to="/#services" className="text-h3 text-dark hover:text-accent">
            Services
          </Link>
          <Link to="/contact" className="text-h3 text-dark hover:text-accent">
            Contact
          </Link>
          <Link to="/results" className="text-h3 text-dark hover:text-accent">
            Results
          </Link>
        </div>

        <Button to="/contact">Book now</Button>
      </nav>
    </header>
  )
}

export default Navbar
