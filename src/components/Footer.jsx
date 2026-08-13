import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'

function Footer() {
  const footerRef = useRef(null)

  useLayoutEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--footer-height',
        `${footer.offsetHeight}px`
      )
    }

    setHeight()

    const observer = new ResizeObserver(setHeight)
    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 left-0 z-0 w-full bg-accent text-dark"
    >
      <div className="relative mx-auto flex max-w-[1289px] items-start justify-between gap-6 px-5 py-20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src="/instagram.svg" alt="Instagram" width={27} height={27} />
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

        <div className="absolute left-1/2 top-1/2 flex max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 text-center">
          <h2>Improve your skin care with Kiana.</h2>
          <Button to="/contact" className="w-[230px]">
            Book now
          </Button>
        </div>

        <div className="flex flex-col items-end gap-3">
          <Link to="/about" className="text-h3 hover:opacity-70">
            About
          </Link>
          <Link to="/#services" className="text-h3 hover:opacity-70">
            Services
          </Link>
          <Link to="/results" className="text-h3 hover:opacity-70">
            Results
          </Link>
          <Link to="/contact" className="text-h3 hover:opacity-70">
            Contact
          </Link>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link to="/">
          <img src="/logo.svg" alt="Skin is Ki" className="w-full" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
