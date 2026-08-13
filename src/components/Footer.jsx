import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import { useSanityQuery } from '../lib/useSanityQuery.js'
import { siteSettingsQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanity.js'

function Footer() {
  const footerRef = useRef(null)
  const { data: settings } = useSanityQuery(siteSettingsQuery)

  const brandName = settings?.brandName ?? 'Skin is Ki'
  const logoUrl = settings?.logo ? urlFor(settings.logo).width(1289).url() : '/logo.svg'
  const email = settings?.email ?? 'kianasmith@gmail.com'
  const phone = settings?.phone ?? '(720) 601 2978'
  const addressLine1 = settings?.addressLine1 ?? '6969 w 90th ave'
  const addressLine2 = settings?.addressLine2 ?? 'Westminster, CO 80021'
  const instagramUrl = settings?.instagramUrl
  const tiktokUrl = settings?.tiktokUrl
  const footerHeading = settings?.footerHeading ?? 'Improve your skin care with Kiana.'

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
      <div className="relative mx-auto flex max-w-[1289px] items-start justify-between gap-6 px-5 py-20 max-md:flex-wrap max-md:gap-8 max-md:px-3">
        <div className="flex flex-col gap-3 max-md:order-2">
          <div className="flex items-center gap-3">
            <a href={instagramUrl || undefined}>
              <img src="/instagram.svg" alt="Instagram" width={27} height={27} />
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
        </div>

        <div className="absolute left-1/2 top-1/2 flex max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 text-center max-md:static max-md:order-1 max-md:max-w-none max-md:basis-full max-md:translate-x-0 max-md:translate-y-0">
          <h2>{footerHeading}</h2>
          <Button to="/contact" className="md:w-57.5">
            Book now
          </Button>
        </div>

        <div className="flex flex-col items-end gap-3 max-md:order-3">
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

      <div className="px-5 pb-5 max-md:px-3">
        <Link to="/">
          <img src={logoUrl} alt={brandName} className="w-full" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
