import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'

const MOBILE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/results', label: 'Results' },
]

function Navbar() {
  const headerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

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

  useEffect(() => {
    if (!isOpen) return

    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('resize', closeOnDesktop)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header
      ref={headerRef}
      className={`relative w-full ${isOpen ? 'bg-accent md:bg-background' : 'bg-background'}`}
    >
      <nav className="mx-auto flex items-center justify-between px-5 py-3 max-md:px-3">
        <Link to="/" className="relative z-20 shrink-0" onClick={closeMenu}>
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

        <Button to="/contact" className="max-md:hidden">
          Book now
        </Button>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="relative z-20 flex h-6 w-7 flex-col items-center justify-center gap-[7px] md:hidden"
        >
          <span
            className={`block h-[2px] w-full bg-dark transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-y-[4.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-dark transition-transform duration-300 ease-in-out ${
              isOpen ? '-translate-y-[4.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-x-0 top-0 z-10 flex h-dvh flex-col overflow-y-auto bg-accent transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="flex flex-1 flex-col justify-between px-3 pb-8 pt-8"
          style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}
        >

          <nav className="flex flex-col gap-3">
            {MOBILE_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className="text-dark leading-[115%]"
                style={{ fontSize: '64px' }}
                tabIndex={isOpen ? 0 : -1}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  width={27}
                  height={27}
                />
                <img src="/tiktok.svg" alt="TikTok" width={23} height={26.5} />
              </div>

              <div>
                <h3>kianasmith@gmail.com</h3>
                <h3>(720) 601 2978</h3>
              </div>

              <p className="text-dark/70">
                6969 w 90th ave
                <br />
                Westminster, CO 80021
              </p>
            </div>

            <Button
              to="/contact"
              className="w-full"
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
            >
              Book now
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
