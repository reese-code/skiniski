import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function ServiceCard({ image, name, price, description }) {
  const imageRef = useRef(null)
  const containerRef = useRef(null)
  const descriptionRef = useRef(null)
  const overlayRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const el = descriptionRef.current
    if (!el || expanded) return

    setIsOverflowing(el.scrollHeight > el.clientHeight + 1)
  }, [description, expanded])

  const toggleExpanded = () => {
    const container = containerRef.current
    const p = descriptionRef.current
    if (!container || !p) return

    gsap.killTweensOf(container)
    gsap.killTweensOf(overlayRef.current)

    if (!expanded) {
      const collapsedHeight = p.clientHeight
      p.classList.remove('line-clamp-2')
      const fullHeight = p.scrollHeight

      gsap.set(container, { height: collapsedHeight })
      gsap.to(container, {
        height: fullHeight,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => gsap.set(container, { height: 'auto' }),
      })
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
      setExpanded(true)
    } else {
      const fullHeight = p.clientHeight
      p.classList.add('line-clamp-2')
      const collapsedHeight = p.clientHeight
      p.classList.remove('line-clamp-2')

      gsap.set(container, { height: fullHeight })
      gsap.to(container, {
        height: collapsedHeight,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          p.classList.add('line-clamp-2')
          gsap.set(container, { height: 'auto' })
        },
      })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, delay: 0.2 })
      setExpanded(false)
    }
  }

  const handleEnter = () => {
    gsap.to(imageRef.current, {
      y: -8,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const handleLeave = () => {
    gsap.to(imageRef.current, {
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link to="/contact">
        {image ? (
          <img
            ref={imageRef}
            src={image}
            alt={name}
            className="aspect-square w-full rounded-2xl border border-dark/10 object-cover max-md:rounded-xl"
          />
        ) : (
          <div
            ref={imageRef}
            className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dark/10 bg-dark/5 text-dark/40 max-md:rounded-xl"
          >
            No image
          </div>
        )}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3>{name}</h3>
          <h3>{price}</h3>
        </div>

        <Link to="/contact">
          <h3 className="hover:underline">Book now</h3>
        </Link>
      </div>

      <div
        ref={containerRef}
        className={`relative mt-1 w-full overflow-hidden ${isOverflowing || expanded ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (isOverflowing || expanded) toggleExpanded()
        }}
      >
        <p
          ref={descriptionRef}
          className={`text-dark/70 ${expanded ? '' : 'line-clamp-2'}`}
        >
          {description}
        </p>

        {isOverflowing && (
          <span
            ref={overlayRef}
            className="pointer-events-none absolute right-0 bottom-0 flex w-1/3 min-w-30 justify-end bg-linear-to-l from-background from-60% to-transparent text-dark/70"
          >
            See more
          </span>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
