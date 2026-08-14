import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function ServiceCard({ image, name, price, description }) {
  const imageRef = useRef(null)
  const descriptionRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const el = descriptionRef.current
    if (!el || expanded) return

    setIsOverflowing(el.scrollHeight > el.clientHeight + 1)
  }, [description, expanded])

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
        className={`relative mt-1 w-full ${isOverflowing || expanded ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (isOverflowing || expanded) setExpanded((prev) => !prev)
        }}
      >
        <p
          ref={descriptionRef}
          className={`text-dark/70 ${expanded ? '' : 'line-clamp-2'}`}
        >
          {description}
        </p>

        {isOverflowing && !expanded && (
          <span className="absolute right-0 bottom-0 bg-background pl-2 text-dark/70">
            See more
          </span>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
