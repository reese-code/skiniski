import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import { useSanityQuery } from '../lib/useSanityQuery.js'
import { siteSettingsQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanity.js'

const MOBILE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/results', label: 'Results' },
]

const REVEAL_MS = 450
const STAGGER_MS = 60
const STAGGER_DURATION_MS = 220
const CLOSE_CONTENT_MS = 140
const CLOSE_BALL_MS = 260

function Navbar() {
  const headerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const { data: settings } = useSanityQuery(siteSettingsQuery)

  const brandName = settings?.brandName ?? 'Skin is Ki'
  const logoUrl = settings?.logo ? urlFor(settings.logo).width(324).url() : '/logo.svg'
  const email = settings?.email ?? 'kianasmith@gmail.com'
  const phone = settings?.phone ?? '(720) 601 2978'
  const addressLine1 = settings?.addressLine1 ?? '6969 w 90th ave'
  const addressLine2 = settings?.addressLine2 ?? 'Westminster, CO 80021'
  const instagramUrl = settings?.instagramUrl
  const tiktokUrl = settings?.tiktokUrl

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
    if (isOpen) {
      setRevealed(true)
      setContentVisible(true)
      return
    }

    setContentVisible(false)
    const timeout = setTimeout(() => setRevealed(false), CLOSE_CONTENT_MS)
    return () => clearTimeout(timeout)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    window.addEventListener('resize', closeOnDesktop)

    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header ref={headerRef} className="relative w-full bg-background">
      <nav className="mx-auto flex items-center justify-between px-5 py-3 max-md:px-3">
        <Link to="/" className="relative z-20 shrink-0" onClick={closeMenu}>
          <img src={logoUrl} alt={brandName} width={162} height={30} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/about" className="text-h3 text-dark hover:underline">
            About
          </Link>
          <Link to="/#services" className="text-h3 text-dark hover:underline">
            Services
          </Link>
          <Link to="/contact" className="text-h3 text-dark hover:underline">
            Contact
          </Link>
          <Link to="/results" className="text-h3 text-dark hover:underline">
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
        className="fixed inset-x-0 top-0 z-10 flex h-dvh flex-col overflow-y-auto bg-accent md:hidden"
        style={{
          transform: revealed ? 'translateY(0)' : 'translateY(-100%)',
          clipPath: revealed
            ? 'circle(1600px at 50% -10%)'
            : 'circle(0px at 50% -10%)',
          transition: isOpen
            ? `clip-path ${REVEAL_MS}ms ease-out, transform 0ms`
            : `clip-path ${CLOSE_BALL_MS}ms ease-in, transform ${CLOSE_BALL_MS}ms ease-in`,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        <div
          className="flex flex-1 flex-col justify-between px-3 pb-3 pt-8"
          style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}
        >
          <nav className="flex flex-col gap-3">
            {MOBILE_LINKS.map(({ to, label }, index) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className="text-dark leading-[115%]"
                style={{
                  fontSize: '64px',
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: isOpen
                    ? `opacity ${STAGGER_DURATION_MS}ms ease-out ${REVEAL_MS + index * STAGGER_MS}ms, transform ${STAGGER_DURATION_MS}ms ease-out ${REVEAL_MS + index * STAGGER_MS}ms`
                    : `opacity ${CLOSE_CONTENT_MS}ms ease-in, transform ${CLOSE_CONTENT_MS}ms ease-in`,
                }}
                tabIndex={isOpen ? 0 : -1}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div
            className="flex flex-col gap-3"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: isOpen
                ? `opacity ${STAGGER_DURATION_MS}ms ease-out ${REVEAL_MS + MOBILE_LINKS.length * STAGGER_MS}ms, transform ${STAGGER_DURATION_MS}ms ease-out ${REVEAL_MS + MOBILE_LINKS.length * STAGGER_MS}ms`
                : `opacity ${CLOSE_CONTENT_MS}ms ease-in, transform ${CLOSE_CONTENT_MS}ms ease-in`,
            }}
          >
            <div className="flex items-center gap-3">
              <a href={instagramUrl || undefined}>
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  width={27}
                  height={27}
                />
              </a>
              <a href={tiktokUrl || undefined}>
                <img src="/tiktok.svg" alt="TikTok" width={23} height={26.5} />
              </a>
            </div>

            <div>
              <h3>{email}</h3>
              <h3>{phone}</h3>
            </div>

            <p className="text-dark/70">
              {addressLine1}
              <br />
              {addressLine2}
            </p>

            <Button
              to="/contact"
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
