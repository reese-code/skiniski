import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import arrowUpRight from '../assets/arrow-up-right.svg'

const ARROW_SHIFT = 4

function Button({ to, href, children, variant = 'dark', className = '', ...props }) {
  const lineRef = useRef(null)
  const textInnerRef = useRef(null)
  const arrowRef = useRef(null)

  const handleEnter = () => {
    const height = lineRef.current.offsetHeight
    gsap.to(textInnerRef.current, {
      y: -height,
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(arrowRef.current, {
      opacity: 1,
      duration: 0.15,
      ease: 'power1.out',
    })
  }

  const handleLeave = () => {
    gsap.to(textInnerRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(arrowRef.current, {
      x: ARROW_SHIFT,
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(arrowRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: 'power1.out',
    })
  }

  const variantClasses =
    variant === 'light' ? 'bg-white text-dark' : 'bg-dark text-white'

  const classes = `relative inline-flex items-center justify-center rounded text-[20px] px-10 py-3 ${variantClasses} ${className}`

  const content = (
    <span className="relative inline-flex items-center">
      <span
        ref={lineRef}
        className="relative block overflow-hidden leading-none"
        style={{ height: '1em' }}
      >
        <span ref={textInnerRef} className="block">
          <span className="block leading-none">{children}</span>
          <span className="block leading-none" aria-hidden="true">
            {children}
          </span>
        </span>
      </span>
      <span className="absolute left-full top-1/2 ml-2 h-3 w-3 -translate-y-1/2">
        <span
          ref={arrowRef}
          className="block h-3 w-3 opacity-0"
          style={{ transform: `translateX(${ARROW_SHIFT}px)` }}
        >
          <img
            src={arrowUpRight}
            alt=""
            width={12}
            height={12}
            className={`h-3 w-3 ${variant === 'light' ? 'invert' : ''}`}
          />
        </span>
      </span>
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={to}
      className={classes}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {content}
    </Link>
  )
}

export default Button
